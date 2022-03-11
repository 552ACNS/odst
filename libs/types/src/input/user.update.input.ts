import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '.prisma/client';
import { PersonUpdateOneRequiredWithoutUserInput } from './org.update.input';

@InputType()
export class UserUpdateInput implements Prisma.UserUpdateInput {
  @Field(() => String)
  username?: string;

  @Field(() => String)
  password?: string;

  @Field(() => PersonUpdateOneRequiredWithoutUserInput)
  person?: Prisma.PersonUpdateOneRequiredWithoutUserInput;

  @Field(() => Boolean)
  enabled?: boolean;
}
