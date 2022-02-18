import jwt_decode from 'jwt-decode';
import { JwtPayload, JwtPayloadRefresh } from '@odst/types';

//These are used in gql.module, which is not async, so made these not async

export function isJwtExpired(token: string): boolean {
  const jwt = jwt_decode(token) as JwtPayload;
  return Date.now() >= jwt.exp * 1000;
}

export function isJwtChainExpired(token: string): boolean {
  const jwt = jwt_decode(token) as JwtPayloadRefresh;
  return Date.now() >= jwt.chainExp * 1000;
}
