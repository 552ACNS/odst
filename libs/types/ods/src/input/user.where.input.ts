import { Field, InputType } from '@nestjs/graphql';
import { Prisma, Role } from '.prisma/ods/client';
import { OrgListRelationFilter } from './org.where.input';
import { UserWhereUniqueInput } from './user.unique.input';

@InputType()
export class UserWhereInput
  extends UserWhereUniqueInput
  implements Prisma.UserWhereInput
{
  enabled?: boolean;

  @Field(() => Role)
  roles?: Role;

  @Field(() => OrgListRelationFilter)
  orgs?: Prisma.OrgListRelationFilter;
}

@InputType()
export class UserListRelationFilter implements Prisma.UserListRelationFilter {
  @Field(() => UserWhereInput)
  every?: Prisma.UserWhereInput;

  @Field(() => UserWhereInput)
  some?: Prisma.UserWhereInput;

  @Field(() => UserWhereInput)
  none?: Prisma.UserWhereInput;
}
