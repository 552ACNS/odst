import { InputType, Field } from '@nestjs/graphql';
import { Prisma, Role } from '.prisma/ods/client';
import { OrgWhereUniqueInput } from './org.unique.input';

@InputType()
export class UserCreateInput implements Prisma.UserCreateInput {
  email: string;
  password: string;
  rank?: string;
  firstName: string;
  lastName: string;
  enabled?: boolean;
  @Field(() => Role)
  role: Role;
}

@InputType()
export class UserCreateNestedManyWithoutOrgsInput
  implements Prisma.UserCreateNestedManyWithoutOrgsInput
{
  @Field(() => OrgWhereUniqueInput)
  connect?: OrgWhereUniqueInput;
}
