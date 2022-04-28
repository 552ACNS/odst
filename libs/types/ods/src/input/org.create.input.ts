import { Field, InputType } from '@nestjs/graphql';
import { OrgTier, Prisma } from '.prisma/ods/client';
import { OrgWhereUniqueInput } from './org.unique.input';
import { Matches } from 'class-validator';
import { UserCreateNestedManyWithoutOrgsInput } from './user.create.input';
import { SurveyCreateNestedManyWithoutOrgsInput } from './survey.create.input';

// When we create the org there's initially no one in it
@InputType()
export class OrgCreateWithoutSurveysInput
  implements Prisma.OrgCreateWithoutSurveysInput
{
  @Matches(/^(([0-9]{1,3})\s([A-Z0-9/\s]{2,15}))+$/)
  name: string;

  @Field(() => OrgTier)
  orgTier: OrgTier;

  @Field(() => UserCreateNestedManyWithoutOrgsInput)
  users?: Prisma.UserCreateNestedManyWithoutOrgsInput;

  @Field(() => OrgCreateNestedOneWithoutChildrenInput)
  parent?: Prisma.OrgCreateNestedOneWithoutChildrenInput;

  @Field(() => OrgCreateNestedManyWithoutParentInput)
  children?: Prisma.OrgCreateNestedManyWithoutParentInput;
}

@InputType()
export class OrgCreateInput
  extends OrgCreateWithoutSurveysInput
  implements Prisma.OrgCreateInput
{
  @Field(() => SurveyCreateNestedManyWithoutOrgsInput)
  surveys?: Prisma.SurveyCreateNestedManyWithoutOrgsInput;
}

@InputType()
export class OrgCreateNestedMany {
  @Field(() => OrgWhereUniqueInput)
  connect?: Prisma.OrgWhereUniqueInput;
}

@InputType()
export class OrgCreateNestedManyWithoutParentInput
  extends OrgCreateNestedMany
  implements Prisma.OrgCreateNestedManyWithoutParentInput {}

@InputType()
export class OrgCreateNestedManyWithoutUsersInput
  extends OrgCreateNestedMany
  implements Prisma.OrgCreateNestedManyWithoutUsersInput {}

@InputType()
export class OrgCreateNestedManyWithoutSurveysInput
  extends OrgCreateNestedMany
  implements Prisma.OrgCreateNestedManyWithoutSurveysInput {}

@InputType()
export class OrgCreateNestedOneWithoutChildrenInput
  extends OrgCreateNestedMany
  implements Prisma.OrgCreateNestedOneWithoutChildrenInput {}
