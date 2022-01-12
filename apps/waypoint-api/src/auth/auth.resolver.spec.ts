import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

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
});
