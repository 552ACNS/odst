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
  @Field(() => [PersonUpdateManyWithoutOrgInput], { nullable: true })
  override persons?: Prisma.PersonUpdateManyWithoutOrgInput;
}

// Think yall forgot to finish this....

@InputType()
export class OrgUpdateOneRequiredWithoutPersonsInput
  implements Prisma.OrgUpdateOneRequiredWithoutPersonsInput
{
  @Field(() => [OrgWhereUniqueInput], { nullable: true })
  connect?: Prisma.OrgWhereUniqueInput;

  //@Field(() => OrgCreateWithoutPersonsInput, { nullable: true })
  //  create?: Prisma.OrgCreateWithoutPersonsInput;

  //@Field(() => OrgUpdateWithoutPersonsDataInput, { nullable: true })
  //update?: Prisma.OrgUpdateWithoutPersonsDataInput;

  //upsert?: Prisma.OrgUpsertWithoutPersonsInput;
}

@InputType()
export class PersonUpdateOneRequiredWithoutUserInput
  implements Prisma.PersonUpdateOneRequiredWithoutUserInput
{
  @Field(() => PersonWhereUniqueInput, { nullable: true })
  connect?: Prisma.PersonWhereUniqueInput;
}

///@InputType()
//export class OrgUpdateOneRequiredWithoutPersonsInput
//// implements Prisma.OrgUpdateOneRequiredWithoutPersonsInput
//{
//  @Field(() => OrgWhereUniqueInput)
// connect?: Prisma.OrgWhereUniqueInput;

// @Field(() => OrgCreateInput)
// create?: Prisma.OrgCreateInput;

// @Field()
// delete?: boolean;

// @Field()
// disconnect?: boolean;

// @Field()
// set?: Prisma.OrgWhereUniqueInput;
//}
