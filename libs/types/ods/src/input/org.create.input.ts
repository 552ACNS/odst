import { Field, InputType } from '@nestjs/graphql';
import { OrgTier, Prisma } from '.prisma/ods/client';
import { OrgGQL } from '../entity/org.entity';
import { OrgWhereUniqueInput } from './org.unique.input';
import { Matches } from 'class-validator';

// When we create the org there's initially no one in it
@InputType()
export class OrgCreateInput implements Prisma.OrgCreateInput {
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
export class UserCreateNestedManyWithoutOrgsInput
  implements Prisma.UserCreateNestedManyWithoutOrgsInput
{
  //TODO something should be here
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
export class OrgCreateNestedOneWithoutChildrenInput
  implements Prisma.OrgCreateNestedOneWithoutChildrenInput
{
  @Field(() => OrgWhereUniqueInput, { nullable: true })
  connect?: Prisma.OrgWhereUniqueInput;

  @Field(() => OrgCreateOrConnectWithoutChildrenInput, { nullable: true })
  connectOrCreate?: Prisma.OrgCreateOrConnectWithoutChildrenInput;
}

@InputType()
export class OrgCreateOrConnectWithoutChildrenInput
  implements Prisma.OrgCreateOrConnectWithoutChildrenInput
{
  @Field(() => OrgWhereUniqueInput)
  where: Prisma.OrgWhereUniqueInput;

  @Field(() => OrgGQL)
  create: OrgGQL;
}

@InputType()
export class OrgCreateOrConnectWithoutParentInput
  implements Prisma.OrgCreateOrConnectWithoutParentInput
{
  @Field(() => OrgWhereUniqueInput)
  where: Prisma.OrgWhereUniqueInput;

  @Field(() => OrgGQL)
  create: OrgGQL;
}

@InputType()
export class OrgCreateOrConnectWithoutSurveysInput
  implements Prisma.OrgCreateOrConnectWithoutSurveysInput
{
  @Field(() => OrgWhereUniqueInput)
  where: Prisma.OrgWhereUniqueInput;

  @Field(() => OrgGQL)
  create: OrgGQL;
}
