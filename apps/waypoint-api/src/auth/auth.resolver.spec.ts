import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginResponse, LoginUserInput, SignupUserInput } from '@odst/types';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let servicer: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          signOptions: { expiresIn: '15m' },
          secret: 'this-should-not-be-hardcoded-here', //process.env.JWT_SECRET
        }),
      ],
      providers: [AuthResolver, AuthService, UserService, PrismaService],
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
    } as unknown as LoginResponse;

    const loginUserInput: LoginUserInput = {
      username: 'username',
      password: 'password',
    };

    // Change value of promise
    const result: Promise<LoginResponse> = Promise.resolve(
      resolvedLoginResponse
    );

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
    const resolvedUser = {
      id: 1,
      username: 'username',
      password: 'password',
    } as unknown as User;

    const resolvedSignupUserInput: SignupUserInput = {
      username: 'username',
      password: 'password',
      person: { connect: { dodId: 11111111 } },
    };

    // Change value of promise
    const result: Promise<User> = Promise.resolve(resolvedUser);

    //Make it so that the createPerson method returns the fake person
    const spy = jest
      .spyOn(servicer, methodToSpy)
      .mockImplementation(() => result);
    // Call the createPerson method by calling the controller
    const actual = await resolver.signup(resolvedSignupUserInput);
    // Assert that the method was called
    expect(spy).toHaveBeenCalled();

    expect(actual).toStrictEqual(resolvedUser);
  });
});
