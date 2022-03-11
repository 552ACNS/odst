import { Field, InputType } from '@nestjs/graphql';
import { OrgTier, Prisma } from '@prisma/client';
import { OrgGQL } from '../entity/org.entity';
import { PersonCreateNestedManyWithoutOrgInput } from './person.create.input';
import { OrgWhereUniqueInput } from './org.unique.input';

// When we create the org there's initially no one in it
@InputType()
export class OrgCreateInput implements Prisma.OrgCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => OrgTier)
  orgTier: OrgTier;

  @Field(() =>[String])
  aliases: string[];

  @Field(() => PersonCreateNestedManyWithoutOrgInput, { nullable: true})
  persons?: Prisma.PersonCreateNestedManyWithoutOrgInput;

  @Field(() => OrgCreateNestedOneWithoutChildrenInput, { nullable: true})
  parent?: Prisma.OrgCreateNestedOneWithoutChildrenInput;

  @Field(() => OrgCreateNestedManyWithoutParentInput, { nullable: true})
  children?: Prisma.OrgCreateNestedManyWithoutParentInput;
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
export class OrgCreateNestedOneWithoutPersonsInput
  implements Prisma.OrgCreateNestedOneWithoutPersonsInput
{
  @Field(() => OrgWhereUniqueInput, { nullable: true })
  connect?: Prisma.OrgWhereUniqueInput;

  @Field(() => OrgGQL, { nullable: true })
  create?: Prisma.OrgCreateWithoutPersonsInput;

  @Field(() => OrgCreateOrConnectWithoutPersonsInput, { nullable: true })
  connectOrCreate?: Prisma.OrgCreateOrConnectWithoutPersonsInput;
}

@InputType()
export class OrgCreateOrConnectWithoutPersonsInput
  implements Prisma.OrgCreateOrConnectWithoutPersonsInput
{
  @Field(() => OrgWhereUniqueInput)
  where: Prisma.OrgWhereUniqueInput;

  @Field(() => OrgGQL)
  create: OrgGQL;
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
export class OrgCreateWithoutPersonsInput
  extends OrgCreateInput
  implements Prisma.OrgCreateWithoutPersonsInput {}
