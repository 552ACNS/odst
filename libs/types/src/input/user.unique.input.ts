import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/client';

@InputType()
export class UserWhereUniqueInput implements Prisma.UserWhereUniqueInput {
  id?: string;
  username?: string;
  personId?: string;
}
