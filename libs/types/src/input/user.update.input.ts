import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '.prisma/waypoint/client';
import { PersonUpdateOneRequiredWithoutUserInput } from './org.update.input';

@InputType()
export class UserUpdateInput implements Prisma.UserUpdateInput {
  username?: string;
  password?: string;

  @Field(() => PersonUpdateOneRequiredWithoutUserInput)
  person?: Prisma.PersonUpdateOneRequiredWithoutUserInput;

  @Field(() => Boolean)
  enabled?: boolean;
}
