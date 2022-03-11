import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/client';
@InputType()
export class UserWhereUniqueInput implements Prisma.UserWhereUniqueInput {
  @Field(() => String)
  id?: string;

  @Field(() => String)
  username?: string;

  @Field(() => String)
  personId?: string;
}
