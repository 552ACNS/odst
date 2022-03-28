import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';

@InputType()
export class UserWhereUniqueInput implements Prisma.UserWhereUniqueInput {
  id?: string;
  email?: string;
}
