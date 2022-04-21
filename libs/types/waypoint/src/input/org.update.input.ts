import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Prisma } from '.prisma/waypoint/client';
import { PersonUpdateManyWithoutOrgInput } from './person.update.input';
import { OrgCreateInput } from './org.create.input';
import { OrgWhereUniqueInput } from './org.unique.input';
import { PersonWhereUniqueInput } from './person.unique.input';

@InputType()
export class OrgUpdateInput
  extends PartialType(OrgCreateInput)
  implements Prisma.OrgUpdateInput
{
  @Field(() => [PersonUpdateManyWithoutOrgInput])
  override persons?: Prisma.PersonUpdateManyWithoutOrgInput;
}

@InputType()
export class OrgUpdateOneRequiredWithoutPersonsInput
  implements Prisma.OrgUpdateOneRequiredWithoutPersonsInput
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
export class PersonUpdateOneRequiredWithoutUserInput
  implements Prisma.PersonUpdateOneRequiredWithoutUserInput
{
  @Field(() => PersonWhereUniqueInput)
  connect?: Prisma.PersonWhereUniqueInput;
}
