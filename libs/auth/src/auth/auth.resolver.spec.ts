import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { MockTokens } from './auth.repo';

describe('Auth Resolver', () => {
  let resolver: AuthResolver;

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

  describe('refreshToken', () => {
    it('should return a set of tokens', async () => {
      await expect(
        resolver.refreshTokens({ refreshToken: 'aaa' })
      ).resolves.toEqual(MockTokens);
    });
  });
});
