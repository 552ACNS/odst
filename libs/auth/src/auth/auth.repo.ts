import { Tokens } from './dtos/tokens.entity';
import { RefreshToken } from './interfaces/refreshToken.interface';
import { User } from './interfaces/user-service.interface';
import { JwtPayloadRefresh } from './types/JwtPayload.types';

export const MockUser: User = {
  id: 'user id',
  email: 'user@mail.com',
  enabled: true,
  //plaintext is p@assword
  password: '$2b$10$1av9vncDI80IVlW4qFekiu9RAph.hPFqWlaxmLvY8S6B8wWuM./l6',
};

export const MockTokens: Tokens = {
  accessToken: 'token',
  refreshToken: 'token',
};

export const MockToken = MockTokens.accessToken;

export const MockDecodedToken: JwtPayloadRefresh = {
  chainExp: 1750389551000,
  iat: 1650390771000,
  exp: 1750389551000,
  sub: 'user id',
};

export const MockRefreshToken: RefreshToken = {
  expiredDate: new Date(new Date().getTime() + 1),
  hash: 'token',
  isRevoked: false,
};
