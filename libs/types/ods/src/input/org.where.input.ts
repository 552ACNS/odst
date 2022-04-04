import { Field, InputType } from '@nestjs/graphql';
import { Prisma, OrgTier } from '.prisma/ods/client';
import { UserListRelationFilter } from './user.where.input';
import { OrgWhereUniqueInput } from './org.unique.input';
import { SurveyListRelationFilter } from './survey.where.input';

@InputType()
export class OrgWhereInput
  extends OrgWhereUniqueInput
  implements Prisma.OrgWhereInput
{
  @Field(() => OrgTier)
  orgTier?: OrgTier;

  @Field(() => UserListRelationFilter)
  users?: Prisma.UserListRelationFilter;

  @Field(() => OrgRelationFilter)
  parent?: Prisma.OrgRelationFilter;

  @Field(() => [SurveyListRelationFilter])
  children?: Prisma.OrgListRelationFilter;

  @Field(() => [SurveyListRelationFilter])
  surveys?: Prisma.SurveyListRelationFilter;
}

@InputType()
export class OrgListRelationFilter implements Prisma.OrgListRelationFilter {
  @Field(() => OrgWhereInput)
  every?: Prisma.OrgWhereInput;

  @Field(() => OrgWhereInput)
  some?: Prisma.OrgWhereInput;

  @Field(() => OrgWhereInput)
  none?: Prisma.OrgWhereInput;
}

@InputType()
export class OrgRelationFilter implements Prisma.OrgRelationFilter {
  @Field(() => OrgWhereInput)
  is?: Prisma.OrgWhereInput;

  @Field(() => OrgWhereInput)
  isNot?: Prisma.OrgWhereInput;
}
