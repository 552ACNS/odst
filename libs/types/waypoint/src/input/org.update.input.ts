import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Prisma } from '.prisma/waypoint/client';
import { PersonUncheckedUpdateManyWithoutOrgNestedInput } from './person.update.input';
import { OrgCreateInput } from './org.create.input';
import { OrgWhereUniqueInput } from './org.unique.input';
import { PersonWhereUniqueInput } from './person.unique.input';

@InputType()
export class OrgUpdateInput
  extends PartialType(OrgCreateInput)
  implements Prisma.OrgUpdateInput
{
  @Field(() => [PersonUncheckedUpdateManyWithoutOrgNestedInput])
  override persons?: Prisma.PersonUpdateManyWithoutOrgNestedInput;
}

@InputType()
// implements Prisma.OrgUpdateOneRequiredWithoutPersonsInput
export class OrgUpdateOneRequiredWithoutPersonsNestedInput
  implements Prisma.OrgUpdateOneRequiredWithoutPersonsNestedInput
{
  @Field(() => [OrgWhereUniqueInput])
  connect?: Prisma.OrgWhereUniqueInput;

  //@Field(() => OrgCreateWithoutPersonsInput)
  //  create?: Prisma.OrgCreateWithoutPersonsInput;

  //@Field(() => OrgUpdateWithoutPersonsDataInput)
  //update?: Prisma.OrgUpdateWithoutPersonsDataInput;

  //upsert?: Prisma.OrgUpsertWithoutPersonsInput;
}

@InputType()
export class PersonUpdateOneRequiredWithoutUserNestedInput
  implements Prisma.PersonUpdateOneRequiredWithoutUserNestedInput
{
  @Field(() => PersonWhereUniqueInput)
  connect?: Prisma.PersonWhereUniqueInput;
}
