import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginUserInput, SignupUserInput, TokensGQL } from '@odst/types';
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
    //Do not put anything sensitive

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          username: username,
          sub: userId,
        },
        {
          expiresIn: process.env.NODE_ENV === 'production' ? '15m' : '5d',
          secret:
            process.env.JWT_SECRET ||
            'dM?|Y[N7WXx<P;-zSFjh)[^m|^0mpJz:qWVGpyfZ9seu-m{`-dlR|ZpP62^t(v$%',
        }
      ),
      await this.jwtService.signAsync(
        {
          username: username,
          sub: userId,
        },
        {
          expiresIn: process.env.NODE_ENV === 'production' ? '3d' : '1w',
          secret:
            process.env.JWT_REFRESH_SECRET ||
            'Wk)6P&Mmb@{55VmbIt4Sj<g(M7^j(9z+/a=4Y-]r501ru_uAz:4Lpx4V:<)`FYmF',
        }
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async validateRefreshToken(
    userId: string,
    providedRefreshToken: string
  ): Promise<boolean> {
    //TODO cut down on so many user lookups during auth pipeline
    const user = await this.userService.findUnique({
      id: userId,
    });

    const refreshToken = await this.refreshTokenService.getLastRefreshToken(
      userId
    );
    Logger.log(`current token: ${refreshToken?.hash}`)

    if (!user || !refreshToken?.hash)
      throw new UnauthorizedException('Access Denied');

    Logger.log(`provided token: ${providedRefreshToken}`)

    const refreshTokensMatch = refreshToken?.hash === providedRefreshToken;
    if (!refreshTokensMatch) throw new UnauthorizedException('Access Denied');

    return true;
  }

  async refreshTokens(userId: string, currentRefreshToken: string): Promise<TokensGQL> {
    const user = await this.userService.findUnique({
      id: userId,
    });
    if (!user) throw new UnauthorizedException();

    const tokens = await this.getTokens(user.id, user.username);
    //TODO do we want to be storing old refresh tokens?
    //If so, what should happen if old one is used?
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
      //TODO max password length of 72 bytes.
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

  //TODO move to refreshToken Servicer?
  async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.refreshTokenService.create({
      expires: new Date(),
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

    const tokens = await this.getTokens(user.id, user.username);
    await this.storeRefreshToken(user.id, tokens.refreshToken);

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

  //TODO is it needed?
  //async logout
}
