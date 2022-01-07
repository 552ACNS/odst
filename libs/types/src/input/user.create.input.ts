import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '.prisma/client';
import { PersonCreateNestedOneWithoutUserInput } from './person.create.input'

@InputType()
export class UserCreateInput implements Prisma.UserCreateInput
{
  username: string;
  passwordHash: string;
  previousPasswords: string[];

  @Field(() => PersonCreateNestedOneWithoutUserInput)
  person!: Prisma.PersonCreateNestedOneWithoutUserInput;
}
