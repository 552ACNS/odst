import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '.prisma/client';
import { PersonUpdateOneRequiredWithoutUserInput } from './org.update.input';

@InputType()
export class UserUpdateInput implements Prisma.UserUpdateInput
{
  username?: string;
  passwordHash?: string;
  previousPasswords?: string[];
  @Field(() => PersonUpdateOneRequiredWithoutUserInput)
  person?: Prisma.PersonUpdateOneRequiredWithoutUserInput;
}
