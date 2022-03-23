import { Field, InputType } from '@nestjs/graphql';
import { OrgTier, Prisma } from '.prisma/ods/client';
import { OrgGQL } from '../entity/org.entity';
import { OrgWhereUniqueInput } from './org.unique.input';
import { Matches } from 'class-validator';
import { UserCreateNestedManyWithoutOrgsInput } from './user.create.input';
import { SurveyCreateNestedManyWithoutOrgsInput } from './survey.create.input'

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
  commanders?: Prisma.UserCreateNestedManyWithoutOrgsInput;

  @Field(() => OrgCreateNestedOneWithoutChildrenInput)
  parent?: Prisma.OrgCreateNestedOneWithoutChildrenInput;

  @Field(() => OrgCreateNestedManyWithoutParentInput)
  children?: Prisma.OrgCreateNestedManyWithoutParentInput;
}

@InputType()
export class OrgCreateInput
extends OrgCreateWithoutSurveysInput
implements Prisma.OrgCreateInput{
  @Field(() => SurveyCreateNestedManyWithoutOrgsInput)
  surveys?:  Prisma.SurveyCreateNestedManyWithoutOrgsInput;
}

@InputType()
export class OrgCreateNestedManyWithoutParentInput
  implements Prisma.OrgCreateNestedManyWithoutParentInput
{
  @Field(() => OrgWhereUniqueInput, { nullable: true })
  connect?: Prisma.OrgWhereUniqueInput;

  @Field(() => OrgCreateOrConnectWithoutParentInput, { nullable: true })
  connectOrCreate?: Prisma.OrgCreateOrConnectWithoutParentInput;
}

@InputType()
export class OrgCreateNestedManyWithoutSurveysInput
  implements Prisma.OrgCreateNestedManyWithoutSurveysInput
{
  @Field(() => OrgWhereUniqueInput, { nullable: true })
  connect?: Prisma.OrgWhereUniqueInput;

  @Field(() => OrgCreateOrConnectWithoutSurveysInput, { nullable: true })
  connectOrCreate?: Prisma.OrgCreateOrConnectWithoutSurveysInput;
}

@InputType()
export class OrgCreateNestedOneWithoutChildrenInput
  implements Prisma.OrgCreateNestedOneWithoutChildrenInput
{
  @Field(() => OrgWhereUniqueInput, { nullable: true })
  connect?: Prisma.OrgWhereUniqueInput;

  @Field(() => OrgCreateOrConnectWithoutChildrenInput, { nullable: true })
  connectOrCreate?: Prisma.OrgCreateOrConnectWithoutChildrenInput;
}

@InputType()
export class OrgCreateOrConnectWithout {
  @Field(() => OrgWhereUniqueInput)
  where: Prisma.OrgWhereUniqueInput;

  @Field(() => OrgGQL)
  create: OrgGQL;
}

@InputType()
export class OrgCreateOrConnectWithoutChildrenInput
  extends OrgCreateOrConnectWithout
  implements Prisma.OrgCreateOrConnectWithoutChildrenInput {}

@InputType()
export class OrgCreateOrConnectWithoutParentInput
  extends OrgCreateOrConnectWithout
  implements Prisma.OrgCreateOrConnectWithoutParentInput {}

@InputType()
export class OrgCreateOrConnectWithoutSurveysInput
  extends OrgCreateOrConnectWithout
  implements Prisma.OrgCreateOrConnectWithoutSurveysInput {}
