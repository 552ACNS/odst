import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PersonCreateNestedOneWithoutUserInput } from './person.create.input';

@InputType()
export class LoginUserInput {
  username: string;

  //user's plaintext password
  password: string;
}

@InputType()
export class SignupUserInput extends LoginUserInput {
  @Field(() => PersonCreateNestedOneWithoutUserInput)
  person: Prisma.PersonCreateNestedOneWithoutUserInput;
}

//not sure about the name/location but it needs to be separated from stuff that deals with the refreshToken DB
@InputType()
export class RefreshLoginInput {
  refreshToken: string;
}
