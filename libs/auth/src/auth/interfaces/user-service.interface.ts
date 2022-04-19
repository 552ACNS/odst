export interface User {
  id: string;
  username?: string;
  email: string;
  enabled: boolean;
  password: string;
}

export interface UserCreateInput {
  username?: string;
  email: string;
  password: string;
}

export interface UserWhereUniqueInput {
  id?: string;
  username?: string;
  email?: string;
}

export interface UserUpdateInput {
  refreshToken?: RefreshTokenUpdateOneWithoutUserInput;
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

export interface RefreshToken {
  isRevoked?: boolean;
  issuedDate?: Date;
  expiredDate: Date;
  hash: string;
}

export interface UserService {
  findUnique: (
    userWhereUniqueInput: UserWhereUniqueInput
  ) => Promise<User | null>;

  create: (userCreateInput: UserCreateInput) => Promise<User>;

  update: (
    userWhereUniqueInput: UserWhereUniqueInput,
    userUpdateInput: UserUpdateInput
  ) => Promise<User>;

  refreshToken: (
    userWhereUniqueInput: UserWhereUniqueInput
  ) => Promise<RefreshToken | null>;
}
