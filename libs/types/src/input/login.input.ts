import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/client';
import { PersonCreateNestedOneWithoutUserInput } from './person.create.input';

@InputType()
export class LoginUserInput {
  @Field()
  username: string;

  //user's plaintext password
  @Field(() => String)
  password: string;
}

@InputType()
export class SignupUserInput extends LoginUserInput {
  @Field(() => PersonCreateNestedOneWithoutUserInput)
  person: Prisma.PersonCreateNestedOneWithoutUserInput;
}
