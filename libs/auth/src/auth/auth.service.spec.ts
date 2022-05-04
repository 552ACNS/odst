import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AUTH_SECRET, USER_SERVICE } from './auth.constants';
import {
  MockRefreshToken,
  MockToken,
  MockTokens,
  MockDecodedToken,
  MockUser,
} from './auth.repo';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn().mockResolvedValue(MockDecodedToken),
            signAsync: jest.fn().mockResolvedValue(MockToken),
          },
        },
        {
          provide: AUTH_SECRET,
          useValue: 'secret',
        },
        AuthService,

        {
          provide: USER_SERVICE,
          useValue: {
            findUnique: jest.fn().mockResolvedValue(MockUser),
            create: jest.fn().mockResolvedValue(MockUser),
            update: jest.fn().mockResolvedValue(MockUser),
            refreshToken: jest.fn().mockResolvedValue(MockRefreshToken),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a set of tokens', async () => {
      await expect(
        service.login({ username: 'username', password: 'password' })
      ).resolves.toEqual(MockTokens);
    });
  });

  describe('refreshTokens', () => {
    it('should return a set of tokens', async () => {
      await expect(
        service.refreshTokens({ refreshToken: MockToken })
      ).resolves.toEqual(MockTokens);
    });
  });

  describe('validateUser', () => {
    it('should return a user', async () => {
      await expect(
        service.validateUser(MockUser.email, 'p@assword')
      ).resolves.toEqual(MockUser);
    });
  });

  describe('validateRefreshToken', () => {
    it('returns whether or not a refresh token is valid', async () => {
      await expect(
        service.validateRefreshToken(MockUser, 'token', MockDecodedToken)
      ).resolves.toEqual(true);
    });
  });

  describe('getToken', () => {
    it('should create and return an access token', async () => {
      await expect(service.getToken('user id', false)).resolves.toEqual(
        MockToken
      );
    });

    it('should create and return an refresh token', async () => {
      await expect(service.getToken('user id', true)).resolves.toEqual(
        MockToken
      );
    });
  });
});
