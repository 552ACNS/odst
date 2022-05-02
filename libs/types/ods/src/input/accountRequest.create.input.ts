import { Field, InputType } from '@nestjs/graphql';
import { Prisma, Role } from '.prisma/ods/client';
import { OrgCreateNestedManyWithoutAccountRequestsInput } from './org.create.input';

@InputType()
export class AccountRequestCreateInput
  implements Prisma.AccountRequestCreateInput
{
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  rank?: string;

  @Field(() => Role)
  role: Role;

  @Field(() => OrgCreateNestedManyWithoutAccountRequestsInput)
  orgs: Prisma.OrgCreateNestedManyWithoutAccountRequestsInput;
}
