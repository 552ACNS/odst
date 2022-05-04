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

export interface UserUpdateInput {
  refreshToken?: RefreshTokenUpdateOneWithoutUserInput;
}

export interface UserService {
  findUnique: (
    userWhereUniqueInput: UserWhereUniqueInput
  ) => Promise<User | null>;

  update: (
    userWhereUniqueInput: UserWhereUniqueInput,
    userUpdateInput: UserUpdateInput
  ) => Promise<User>;

  refreshToken: (
    userWhereUniqueInput: UserWhereUniqueInput
  ) => Promise<RefreshToken | null>;
}
