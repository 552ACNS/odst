import {
  RefreshToken,
  RefreshTokenUpdateOneWithoutUserInput,
} from './refreshToken.interface';

export interface User {
  id: string;
  username?: string;
  email: string;
  enabled: boolean;
  password: string;
}

export interface UserWhereUniqueInput {
  id?: string;
  username?: string;
  email?: string;
}

export interface UserWhereInput {
  username?: StringFilter | string;
  email?: StringFilter | string;
}

export type StringFilter = {
  equals?: string;
  mode?: QueryMode;
};

export type QueryMode = typeof QueryMode[keyof typeof QueryMode];

export const QueryMode = {
  default: 'default',
  insensitive: 'insensitive',
};

export interface UserUpdateInput {
  refreshToken?: RefreshTokenUpdateOneWithoutUserInput;
}

export interface UserFindManyArgs {
  where?: UserWhereInput;
}

export interface UserService {
  findUnique: (
    userWhereUniqueInput: UserWhereUniqueInput
  ) => Promise<User | null>;

  findMany: (userFindManyArgs: UserFindManyArgs) => Promise<User[]>;

  update: (
    userWhereUniqueInput: UserWhereUniqueInput,
    userUpdateInput: UserUpdateInput
  ) => Promise<User>;

  refreshToken: (
    userWhereUniqueInput: UserWhereUniqueInput
  ) => Promise<RefreshToken | null>;
}
