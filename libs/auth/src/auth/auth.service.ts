import {
  Injectable,
  Inject,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH_SECRET, USER_SERVICE } from './auth.constants';
import { UserService, User } from './interfaces/user-service.interface';
import { compare } from 'bcrypt';
import { Tokens } from './dtos/tokens.entity';
import { LoginUserInput, RefreshLoginInput } from './dtos/login.input';
import { JwtPayloadRefresh } from './types/JwtPayload.types';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_SECRET) private readonly secret: string,
    @Inject(USER_SERVICE) private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginInput: LoginUserInput): Promise<Tokens> {
    const user = await this.getUserByEmailOrUsername(loginInput.username);

    if (user) {
      return {
        accessToken: await this.getToken(user.id, false),
        refreshToken: await this.getToken(user.id, true),
      };
    }
    throw new UnauthorizedException();
  }

  async refreshTokens(
    refreshLoginInput: RefreshLoginInput,
    user: User
  ): Promise<Tokens> {
    const token = this.jwtService.verify(refreshLoginInput.refreshToken, {
      secret: this.secret,
    });

    if (
      !(await this.validateRefreshToken(
        user,
        refreshLoginInput.refreshToken,
        token
      ))
    ) {
      throw new UnauthorizedException();
    }

    if (!token || !user.enabled) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: await this.getToken(user.id, false),
      refreshToken: await this.getToken(user.id, true),
    };
  }

  async validateUser(
    emailOrUsername: string,
    passwordPlaintextInput: string
  ): Promise<unknown> {
    const user = await this.getUserByEmailOrUsername(emailOrUsername);
    if (user && user.enabled) {
      //first is plaintext, second is hash to compare it to
      //TODO max password length of 72 bytes.
      //Longer causes bcrypt to have unexpected behavior.
      //probably should be something like 50 characters to be safe
      const valid = await compare(passwordPlaintextInput, user.password);

      if (valid) {
        // password is deconstructed to ensure it is not returned
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return user;
      }
    }
    return null;
  }

  async validateRefreshToken(
    user: User,
    providedRefreshToken: string,
    decodedToken: JwtPayloadRefresh
  ): Promise<boolean> {
    if (Date.now() >= decodedToken.chainExp * 1000) {
      throw new UnauthorizedException();
    }

    const refreshToken = await this.userService.refreshToken({ id: user.id });

    //if user or refreshToken.hash do not exist, throw exception
    if (!refreshToken?.hash || refreshToken.isRevoked) {
      throw new UnauthorizedException();
    }

    const refreshTokensMatch = refreshToken.hash === providedRefreshToken;

    if (!refreshTokensMatch) {
      //invalidating existing refresh token, since someone is using an outdated token (either maliciously or it's from an old session)
      //TODO need to return an error to indicate that FE needs to login, no way to reauthorize
      throw new UnauthorizedException();
    }
    return true;
  }

  async getToken(userId: string, isRefreshToken: boolean): Promise<string> {
    const token = await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        expiresIn: process.env['NODE_ENV'] === 'production' ? '15m' : '5d',
        secret: this.secret,
      }
    );

    if (isRefreshToken) {
      let expiresIn = new Date();
      expiresIn = new Date(expiresIn.getTime() + 15 * 60 * 1000);
      this.userService.update(
        { id: userId },
        {
          refreshToken: {
            upsert: {
              create: {
                hash: token,
                expiredDate: expiresIn,
              },
              update: {
                hash: token,
                expiredDate: expiresIn,
                issuedDate: new Date(),
              },
            },
          },
        }
      );
    }
    return token;
  }

  // eslint-disable-next-line complexity
  async getUserByEmailOrUsername(
    emailOrUsername: string
  ): Promise<User | null> {
    //TODO how to prevent user signing up with with someone's email as their username
    //example: someone uses Lt Col Matos's email as their username and then Lt Col Matos comes in and he can't make an account with that email
    //Gets user by email or username
    //TODO could optmize to not make two db calls
    //or maybe not since we don't inject prisma

    let userFromEmail: User | null;
    let userFromUsername: User | null;

    //first try to get by username, return it if exists
    try {
      const usersFromEmail = await this.userService.findMany({
        where: { email: { equals: emailOrUsername, mode: 'insensitive' } },
      });

      if (usersFromEmail.length > 1) {
        throw new InternalServerErrorException('duplicate email');
      }

      userFromEmail = usersFromEmail[0];

      if (userFromEmail) {
        return userFromEmail;
      }
    } catch {
      userFromEmail = null;
    }

    try {
      const usersFromUsername = await this.userService.findMany({
        where: { username: { equals: emailOrUsername, mode: 'insensitive' } },
      });

      if (usersFromUsername.length > 1) {
        throw new InternalServerErrorException('duplicate username');
      }

      userFromUsername = usersFromUsername[0];
    } catch {
      userFromUsername = null;
    }

    //could be null
    return userFromUsername;
  }
}
