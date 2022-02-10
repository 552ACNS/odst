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
  //TODO 21 implement keyid
}

//export interface AccessTokenPayload extends JwtPayload {};
export type AccessTokenPayload = JwtPayload;

export interface RefreshTokenPayload extends JwtPayload {
  //expiration of the refresh token chain
  chain_exp: number;
}
