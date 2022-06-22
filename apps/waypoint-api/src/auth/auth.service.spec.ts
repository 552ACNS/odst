import { UnauthorizedException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User, Prisma } from '.prisma/waypoint/client';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../prisma/singleton';
import { RefreshTokenService } from '../refreshToken/refreshToken.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [
        AuthService,
        UserService,
        { provide: PrismaService, useValue: prismaMock },
        RefreshTokenService,
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
    const userInput = {
      username: 'idonotexist',
      password: 'password',
    };
    const userWhereUniqueInput: Prisma.UserWhereUniqueInput = {
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
    const userInput = {
      username: 'test',
      password: 'test',
      person: { connect: { dodId: 123456789 } },
    };

    await await service.signup(userInput);

    expect(prismaMock.user.create).toHaveBeenCalled();
  });
});
