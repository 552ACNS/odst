import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  //could represent user's email also
  //something somewhere doesn't like it being renamed to emailOrusername
  //nestjs's auth docs mention why
  @Field(() => String)
  username: string;

  //user's plaintext password
  @Field(() => String)
  password: string;
}

@InputType()
export class SignupUserInput {
  @Field(() => String)
  username?: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class RefreshLoginInput {
  @Field(() => String)
  refreshToken: string;
}
