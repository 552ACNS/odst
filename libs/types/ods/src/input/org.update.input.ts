import { InputType, Field, PartialType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { OrgCreateInput } from './org.create.input';
import { OrgWhereUniqueInput } from './org.unique.input';

@InputType()
export class OrgUpdateInput
  extends PartialType(OrgCreateInput)
  implements Prisma.OrgUpdateInput
{
  //TODO

}

