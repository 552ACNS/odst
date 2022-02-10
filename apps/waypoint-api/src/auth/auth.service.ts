import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  LoginUserInput,
  RefreshTokenPayload,
  SignupUserInput,
  TokensGQL,
  JwtPayloadCreateInput,
} from '@odst/types';
import { isJwtChainExpired } from '@odst/helpers';
import { compare, hash } from 'bcrypt';
import { RefreshTokenService } from '../refreshToken/refreshToken.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService
  ) {}

  async hash(data: string) {
    return await hash(data, 10);
  }

  async getTokens(userId: string, username: string): Promise<TokensGQL> {
    //builds payload of tokens. will be encoded, not encrypted.
    //Do not put anything sensitive in payload

    const accessTokenPayload: JwtPayloadCreateInput = {
      username: username,
      sub: userId,
    };

    const accessToken = await this.jwtService.signAsync(accessTokenPayload, {
      expiresIn: process.env.NODE_ENV === 'production' ? '15m' : '5d',
      //TODO 17 process.env doesn't work, fix hardcoded value
      secret:
        process.env.JWT_SECRET ||
        'dM?|Y[N7WXx<P;-zSFjh)[^m|^0mpJz:qWVGpyfZ9seu-m{`-dlR|ZpP62^t(v$%',
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        username: username,
        sub: userId,
        //TODO 24 move the chain_exp value to env variable (the 3)
        chain_exp: Math.floor(Date.now() / 1000 + 3 * 3600),

      },
      {
        expiresIn: process.env.NODE_ENV === 'production' ? '30m' : '1w',
        //TODO 17 process.env doesn't work, fix hardcoded value
        secret:
          process.env.JWT_REFRESH_SECRET ||
          'Wk)6P&Mmb@{55VmbIt4Sj<g(M7^j(9z+/a=4Y-]r501ru_uAz:4Lpx4V:<)`FYmF',
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateRefreshToken(
    userId: string,
    providedRefreshToken: string
  ): Promise<boolean> {
    if (isJwtChainExpired(providedRefreshToken)) {
      console.log('jwt refresh chain expired');
      throw new UnauthorizedException();
    }

    //TODO 27 cut down on so many user lookups during auth pipeline
    const user = await this.userService.findUnique({
      id: userId,
    });

    const refreshToken = await this.refreshTokenService.getLastRefreshToken(
      userId
    );

    //if user or refreshToken.hash do not exist, throw exception
    if (!user || !refreshToken?.hash) {
      throw new UnauthorizedException();
    }

    const refreshTokensMatch = refreshToken.hash === providedRefreshToken;

    if (!refreshTokensMatch) {
      //invalidating existing refresh token, since someone is using an outdated token (either maliciously or it's from an old session)
      //TODO this.refreshTokenService.update({ id: userId }, { isRevoked: false });
      //TODO 25 need to return an error to indicate that FE needs to login, no way to reauthorize
      throw new UnauthorizedException();
    }
    return true;
  }

  async refreshTokens(userId: string): Promise<TokensGQL> {
    const user = await this.userService.findUnique({
      id: userId,
    });
    if (!user) throw new UnauthorizedException();

    const tokens = await this.getTokens(user.id, user.username);

    this.storeRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  //expects the token as a variable, instead of auth header
  async refreshTokensVar(refreshToken: string): Promise<TokensGQL> {
    if (
      !this.jwtService.verify(refreshToken, {
        secret:
          process.env.JWT_REFRESH_SECRET ||
          'Wk)6P&Mmb@{55VmbIt4Sj<g(M7^j(9z+/a=4Y-]r501ru_uAz:4Lpx4V:<)`FYmF',
      })
    ) {
      throw new UnauthorizedException();
    }

    const refreshTokenPayload = this.jwtService.decode(
      refreshToken
    ) as RefreshTokenPayload;

    const userId = refreshTokenPayload.sub;

    if (!(await this.validateRefreshToken(userId, refreshToken))) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findUnique({ id: userId });

    if (!user || !user.enabled) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user.id, user.username);
    await this.storeRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async validateUser(
    username: string,
    passwordPlaintextInput: string
  ): Promise<unknown> {
    const user = await this.userService.findUnique({ username: username });
    if (user && user.enabled) {
      //first is plaintext, second is hash to compare it to
      //TODO 26 max password length of 72 bytes.
      //Longer causes bcrypt to have unexpected behavior.
      //probably should be something like 50 characters to be safe
      const valid = await compare(passwordPlaintextInput, user.password);

      if (valid) {
        // Do we need to destructure the password?
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const refreshTokenPayload = this.jwtService.decode(
      refreshToken
    ) as RefreshTokenPayload;
    this.refreshTokenService.create({
      expires: refreshTokenPayload.exp
        ? new Date(refreshTokenPayload.exp * 1000)
        : new Date(),
      hash: refreshToken,
      user: { connect: { id: userId } },
    });
  }

  async signup(signupUserInput: SignupUserInput): Promise<TokensGQL> {
    //hash plaintext password input
    const password = await this.hash(signupUserInput.password);

    //if user exists, database will throw unique error
    const user = await this.userService.create({
      ...signupUserInput,
      password,
      person: signupUserInput.person,
    });

    const tokens = await this.getTokens(user?.id, user?.username);
    await this.storeRefreshToken(user?.id, tokens?.refreshToken);

    return tokens;
  }

  async login(loginInput: LoginUserInput): Promise<TokensGQL> {
    const user = await this.userService.findUnique({
      username: loginInput.username,
    });
    if (user) {
      const tokens = await this.getTokens(user.id, user.username);
      await this.storeRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    }
    throw new UnauthorizedException();
  }

  //TODO 28 is it needed?
  //async logout(){
  //  ...
  //}
}
