import jwt_decode from 'jwt-decode';
import { JwtPayload, RefreshTokenPayload } from '@odst/types';

//These are used in gql.module, which is not async, so made these not async

export function isJwtExpired(token: string): boolean {
  const jwt = jwt_decode(token) as JwtPayload;
  return Date.now() >= jwt.exp * 1000;
}

export function isJwtChainExpired(token: string): boolean {
  const jwt = jwt_decode(token) as RefreshTokenPayload;
  return Date.now() >= jwt.chain_exp * 1000;
}
