import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';

@InputType()
export class OrgWhereUniqueInput implements Prisma.OrgWhereUniqueInput {
  id?: string;
  name?: string;
}
