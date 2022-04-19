import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { MockTokens } from './auth.repo';
import { User } from './interfaces/user-service.interface';

const MockUser: User = {
  id: 'user id',
  email: 'user@mail.com',
  enabled: true,
  password: 'p@assword',
};

describe('Auth Resolver', () => {
  let resolver: AuthResolver;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthResolver],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(MockTokens),
            signup: jest.fn().mockResolvedValue(MockTokens),
            refreshTokens: jest.fn().mockResolvedValue(MockTokens),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('login', () => {
    it('should return a set of tokens', async () => {
      await expect(
        resolver.login({ username: 'username', password: 'password' })
      ).resolves.toEqual(MockTokens);
    });
  });

  describe('signup', () => {
    it('should return a set of tokens', async () => {
      await expect(
        resolver.signup({ email: 'email', password: 'password' })
      ).resolves.toEqual(MockTokens);
    });
  });

  describe('refreshToken', () => {
    it('should return a set of tokens', async () => {
      await expect(
        resolver.refreshTokens({ refreshToken: 'aaa' }, MockUser)
      ).resolves.toEqual(MockTokens);
    });
  });
});
