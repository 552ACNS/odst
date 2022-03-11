import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/client';
@InputType()
export class UserWhereUniqueInput implements Prisma.UserWhereUniqueInput {
  @Field(() => String, { nullable: true})
  id?: string;

  @Field(() => String, { nullable: true})
  username?: string;

  @Field(() => String, { nullable: true})
  personId?: string;
}
