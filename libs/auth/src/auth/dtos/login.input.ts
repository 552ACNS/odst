import { InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  //could represent user's email also
  //something somewhere doesn't like it being renamed to emailOrusername
  //nestjs's auth docs mention why
  username: string;

  //user's plaintext password
  password: string;
}

@InputType()
export class SignupUserInput {
  username?: string;
  email: string;
  password: string;
}

@InputType()
export class RefreshLoginInput {
  refreshToken: string;
}
