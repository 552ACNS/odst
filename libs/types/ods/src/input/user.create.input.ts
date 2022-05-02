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

  //TODO org

  //TODO refreshtoken
  // @Field(() => RefreshTokenCreateNestedManyWithoutUserInput)
  // refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
}

@InputType()
export class UserCreateNestedManyWithoutOrgsInput
  implements Prisma.UserCreateNestedManyWithoutOrgsInput
{
  @Field(() => OrgWhereUniqueInput)
  connect?: OrgWhereUniqueInput;
}

export class UserCreateNestedManyWithoutApprovedRequestsInput
  implements Prisma.UserCreateNestedManyWithoutApprovedRequestsInput
{
  @Field(() => OrgWhereUniqueInput)
  connect?: OrgWhereUniqueInput;
}

export class UserCreateNestedOneWithoutAccountRequestInput
  implements Prisma.UserCreateNestedOneWithoutAccountRequestInput
{
  @Field(() => OrgWhereUniqueInput)
  connect?: OrgWhereUniqueInput;
}
