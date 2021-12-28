import { Prisma } from '.prisma/client';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { OrgUpdateOneRequiredWithoutPersonsInput } from './org.update.input';
import {
  PersonCreateManyOrgInputEnvelope,
  PersonCreateWithoutOrgInput,
} from './person.create.input';

@InputType()
export class PersonUncheckedUpdateWithoutOrgInput
  extends PartialType(PersonCreateWithoutOrgInput)
  implements Prisma.PersonUncheckedUpdateWithoutOrgInput {}

@InputType()
export class PersonUpdateInput
  extends PersonUncheckedUpdateWithoutOrgInput
  implements Prisma.PersonUpdateInput
{
  @Field(() => [OrgUpdateOneRequiredWithoutPersonsInput])
  org?: Prisma.OrgUpdateOneRequiredWithoutPersonsInput;
}

@InputType()
export class PersonUpdateManyWithoutOrgInput
  implements Prisma.PersonUpdateManyWithoutOrgInput
{
  @Field(() => [PersonCreateWithoutOrgInput])
  create?: Prisma.PersonCreateWithoutOrgInput[];

  @Field(() => PersonCreateManyOrgInputEnvelope)
  createMany?: Prisma.PersonCreateManyOrgInputEnvelope;

  @Field(() => [PersonUpdateWithWhereUniqueWithoutOrgInput])
  update?: Prisma.PersonUpdateWithWhereUniqueWithoutOrgInput[];

  // @Field(() => [PersonUpdateManyWithWhereWithoutOrgInput])
  // updateMany?: Prisma.PersonUpdateManyWithWhereWithoutOrgInput[];
}
@InputType()
export class PersonUpdateWithWhereUniqueWithoutOrgInput
  implements Prisma.PersonUpdateWithWhereUniqueWithoutOrgInput
{
  @Field(() => PersonUpdateInput)
  data: PersonUpdateInput;

  @Field(() => String)
  where: Prisma.PersonWhereUniqueInput;
}

// @InputType()
// export class PersonUpdateManyWithWhereWithoutOrgInput
//   implements Prisma.PersonUpdateManyWithWhereWithoutOrgInput
// {
//   where: Prisma.PersonScalarWhereInput;
//   data: (Prisma.Without<Prisma.PersonUpdateManyMutationInput, Prisma.PersonUncheckedUpdateManyWithoutPersonsInput> & Prisma.PersonUncheckedUpdateManyWithoutPersonsInput) | (Prisma.Without<...> & Prisma.PersonUpdateManyMutationInput);
// }

// export class PersonUncheckedUpdateManyInput
//   implements Prisma.PersonUncheckedUpdateManyInput {}
