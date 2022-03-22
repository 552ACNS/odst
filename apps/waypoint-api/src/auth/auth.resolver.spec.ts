import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TokensGQL, LoginUserInput, SignupUserInput } from '@odst/types';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { RefreshTokenService } from '../refreshToken/refreshToken.service';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { PassportModule } from '@nestjs/passport';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let servicer: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule, JwtModule.register({})],
      providers: [
        AuthService,
        AuthResolver,
        UserService,
        LocalStrategy,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        RefreshTokenService,
        PrismaService,
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    servicer = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('Should call the method to login', async () => {
    // TEST PARAMS
    const methodToSpy = 'login';

    const user: User = {
      username: 'username',
      personId: 'personidString',
    } as unknown as User;

    const resolvedLoginResponse = {
      user: user,
      token: 'thisismytoken',
    } as unknown as TokensGQL;

    const loginUserInput: LoginUserInput = {
      username: 'username',
      password: 'password',
    };

    // Change value of promise
    const result: Promise<TokensGQL> = Promise.resolve(resolvedLoginResponse);

    //Make it so that the createPerson method returns the fake person
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);
    // Call the createPerson method by calling the controller
    const actual = await resolver.login(loginUserInput);
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toStrictEqual(resolvedLoginResponse);
  });

  it('Should call the method to signup', async () => {
    // TEST PARAMS
    const methodToSpy = 'signup';
    const resolvedTokens = {
      accessToken: 'this-is-my-access-token',
      refreshToken: 'this-is-my-refresh-token',
    } as unknown as TokensGQL;

    const resolvedSignupUserInput: SignupUserInput = {
      username: 'username',
      password: 'password',
      person: { connect: { dodId: 11111111 } },
    };

    // Change value of promise
    const result: Promise<TokensGQL> = Promise.resolve(resolvedTokens);

    //Make it so that the createPerson method returns the fake person
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);
    // Call the createPerson method by calling the controller
    const actual = await resolver.signup(resolvedSignupUserInput);
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toStrictEqual(resolvedTokens);
  });
});
