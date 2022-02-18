export interface JwtPayloadInit {
  username: string;
  sub: string;
}

export interface JwtPayload extends JwtPayloadInit{
  //issued at
  iat: number;

  //expiration
  exp: number;
  //TODO implement aud (short fo' audience) which is client id
  //TODO implement keyid
}

//export interface JwtPayloadAccess extends JwtPayload {};
export type JwtPayloadAccess = JwtPayload;

export interface JwtPayloadRefresh extends JwtPayload {
  chainExp: number; //expiration of the refresh token chain
}
