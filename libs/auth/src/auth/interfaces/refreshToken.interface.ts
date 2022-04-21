export interface RefreshToken {
  isRevoked?: boolean;
  issuedDate?: Date;
  expiredDate: Date;
  hash: string;
}

export interface RefreshTokenUpdateOneWithoutUserInput {
  create?: RefreshTokenCreateWithoutUserInput;
  update?: RefreshTokenUpdateWithoutUserInput;
  delete?: boolean;
  upsert?: RefreshTokenUpsertWithoutUserInput;
}

export interface RefreshTokenCreateWithoutUserInput {
  isRevoked?: boolean;
  issuedDate?: Date;
  expiredDate: Date;
  hash: string;
}

export interface RefreshTokenUpdateWithoutUserInput {
  isRevoked?: boolean;
  issuedDate: Date;
  expiredDate: Date;
  hash: string;
}

export interface RefreshTokenUpsertWithoutUserInput {
  update: RefreshTokenUpdateWithoutUserInput;
  create: RefreshTokenCreateWithoutUserInput;
}
