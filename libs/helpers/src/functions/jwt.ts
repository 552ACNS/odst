import { JwtPayload, JwtPayloadRefresh } from '@odst/shared/nest';
import jwt_decode from 'jwt-decode';
//TODO move to auth lib?
//These are used in gql.module, which is not async, so made these not async

export function isJwtExpired(token: string): boolean {
  const jwt = jwt_decode(token) as JwtPayload;
  return Date.now() >= jwt.exp * 1000;
}

export function isJwtChainExpired(token: string): boolean {
  const jwt = jwt_decode(token) as JwtPayloadRefresh;
  return Date.now() >= jwt.chainExp * 1000;
}

export function jsonTypeConverter(
  arrOne: string[],
  arrTwo: string[]
): { value: string; questionId: string }[] {
  const result: {
    value: string;
    questionId: string;
  }[] = [];
  for (let i = 0; i < arrOne.length; i++) {
    result.push({
      value: arrOne[i],
      questionId: arrTwo[i],
    });
  }
  return result;
}
