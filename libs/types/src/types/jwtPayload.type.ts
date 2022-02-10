export interface JwtPayloadCreateInput {
  username: string;
  sub: string;
}

export interface JwtPayload extends JwtPayloadCreateInput{
  //issued at
  iat: number;

  //expiration
  exp: number;
  //TODO implement aud (short fo' audience) which is client id
  //TODO implement keyid
}

//export interface AccessTokenPayload extends JwtPayload {};
export type AccessTokenPayload = JwtPayload;

export interface RefreshTokenPayload extends JwtPayload {
  chain_exp: number; //expiration of the refresh token chain
}
