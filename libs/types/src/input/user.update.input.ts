import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Prisma } from '.prisma/client';
import { UserCreateWithoutPersonInput } from './user.create.input';
import { PersonUpdateOneRequiredWithoutUserInput } from './org.update.input';


@InputType()
export class UserUncheckedUpdateWithoutPersonInput
  extends PartialType(UserCreateWithoutPersonInput)
  implements Prisma.UserUncheckedUpdateWithoutPersonInput {}

export class UserUpdateInput
  extends UserUncheckedUpdateWithoutPersonInput
  implements Prisma.UserUpdateInput
{
  @Field(() => PersonUpdateOneRequiredWithoutUserInput)
  person?: Prisma.PersonUpdateOneRequiredWithoutUserInput;
}
