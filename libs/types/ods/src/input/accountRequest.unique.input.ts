import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';

@InputType()
export class AccountRequestWhereUniqueInput
  implements Prisma.AccountRequestWhereUniqueInput
{
  id?: string;
  email?: string;
}
