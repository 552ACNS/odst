import {
  BirthState,
  EyeColor,
  HairColor,
  Prisma,
  Role,
  Spec,
} from '.prisma/client';
import { Field, InputType } from '@nestjs/graphql';
import { PersonGQL } from '../entity/person.entity';
import { OrgCreateNestedOneWithoutPersonsInput } from './org.create.input';
import { PersonWhereUniqueInput } from './person.unique.input';

@InputType()
export class PersonCreateWithoutOrgInput
  implements Prisma.PersonCreateWithoutOrgInput
{
  @Field(() => HairColor)
  hairColor!: HairColor;

  @Field(() => Number)
  dodId!: number;

  @Field(() => Number)
  ssn!: number;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  firstName!: string;

  @Field(() => String)

  @Field(() => String)
  middleInitial?: string;

  @Field(() => String)
  lastName!: string;

  @Field(() => Date)
  birthDate!: Date;

  @Field(() => String)
  birthCity!: string;

  @Field(() => String)
  birthCountry!: string;

  @Field(() => String)
  citizenshipId!: string;

  @Field(() => Boolean)
  initialTraining?: boolean;

  @Field(() => Boolean)
  NDA?: boolean;

  @Field(() => Number)
  grade!: number;

  @Field(() => EyeColor)
  eyeColor!: EyeColor;

  @Field(() => BirthState)
  birthState!: BirthState;

  @Field(() => Role)
  role!: Role;

  @Field(() => Spec)
  spec!: Spec;

  @Field(() => Number)
  height!: number;
}

@InputType()
export class PersonCreateInput
  extends PersonCreateWithoutOrgInput
  implements Prisma.PersonCreateInput
{
  @Field(() => OrgCreateNestedOneWithoutPersonsInput)
  org!: Prisma.OrgCreateNestedOneWithoutPersonsInput;
}

@InputType()
export class PersonCreateManyOrgInputEnvelope
  implements Prisma.PersonCreateManyOrgInputEnvelope
{
  @Field(() => [PersonCreateInput])
  data!: Prisma.PersonCreateInput[];

  @Field(() => Boolean)
  skipDuplicates?: boolean;
}

@InputType()
export class PersonCreateNestedManyWithoutOrgInput
  implements Prisma.PersonCreateNestedManyWithoutOrgInput
{
  @Field(() => PersonWhereUniqueInput, { nullable: true })
  connect?: Prisma.PersonWhereUniqueInput;

  @Field(() => PersonCreateNestedManyWithoutOrgInput, { nullable: true })
  connectOrCreate?: Prisma.PersonCreateOrConnectWithoutOrgInput;
}

@InputType()
export class PersonCreateNestedOneWithoutUserInput
  implements Prisma.PersonCreateNestedOneWithoutUserInput
{
  @Field(() => PersonWhereUniqueInput, { nullable: true })
  connect?: Prisma.PersonWhereUniqueInput;

  @Field(() => PersonGQL, { nullable: true })
  create?: Prisma.PersonCreateWithoutUserInput;

  @Field(() => PersonCreateOrConnectWithoutUserInput, { nullable: true })
  connectOrCreate?: Prisma.PersonCreateOrConnectWithoutUserInput;
}

@InputType()
export class PersonCreateOrConnectWithoutUserInput
  implements Prisma.PersonCreateOrConnectWithoutUserInput
{
  @Field(() => PersonWhereUniqueInput)
  where: Prisma.OrgWhereUniqueInput;

  @Field(() => PersonGQL)
  create: PersonGQL;
}
