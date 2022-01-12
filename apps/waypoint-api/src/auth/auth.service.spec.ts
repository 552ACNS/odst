import { UnauthorizedException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import {
  LoginUserInput,
  SignupUserInput,
  UserWhereUniqueInput,
} from '@odst/types';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../prisma/singleton';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          signOptions: { expiresIn: '15m' },
          secret: 'this-should-not-be-hardcoded-here', //process.env.JWT_SECRET
        }),
      ],
      providers: [
        AuthService,
        UserService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user ', async () => {
    await service.validateUser('thisismyusername', 'thisismypassword');
    expect(prismaMock.user.findUnique).toHaveBeenCalled();
  });

  it('should throw UnauthorizedException due to incorrecct credentials', async () => {
    const userInput: LoginUserInput = {
      username: 'idonotexist',
      password: 'password',
    };
    const userWhereUniqueInput: UserWhereUniqueInput = {
      username: userInput.username,
    };
    const resolvedUser: User = userWhereUniqueInput as unknown as User;
    try {
      await await service.login(resolvedUser);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
    expect(prismaMock.user.findUnique).toHaveBeenCalled();
  });

  it('should sign up user', async () => {
    const userInput: SignupUserInput = {
      username: 'test',
      password: 'test',
      person: { connect: { dodId: 123456789 } },
    };

    await service.signup(userInput);

    expect(prismaMock.user.create).toHaveBeenCalled();
  });
});
