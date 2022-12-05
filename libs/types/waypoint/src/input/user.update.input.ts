import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '.prisma/waypoint/client';
import { PersonUpdateOneRequiredWithoutUserNestedInput } from './org.update.input';

@InputType()
export class UserUpdateInput implements Prisma.UserUpdateInput {
  username?: string;
  password?: string;

  @Field(() => PersonUpdateOneRequiredWithoutUserNestedInput)
  person?: Prisma.PersonUpdateOneRequiredWithoutUserNestedInput;
  enabled?: boolean;
}
