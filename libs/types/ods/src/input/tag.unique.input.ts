import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';

@InputType()
export class TagWhereUniqueInput implements Prisma.TagWhereUniqueInput {
  id?: string;
}
