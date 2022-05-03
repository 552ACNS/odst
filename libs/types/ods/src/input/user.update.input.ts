import { InputType, Field } from '@nestjs/graphql';
import { Prisma, Role } from '.prisma/ods/client';
import { UserWhereUniqueInput } from './user.unique.input';

@InputType()
export class UserUpdateInput implements Prisma.UserUpdateInput {
  rank?: string;
  email?: string;
  password?: string;
  enabled?: boolean;

  @Field(() => Role)
  roles: Role;

  //TODO refreshToken, org
}

@InputType()
export class UserUpdateOneWithoutApprovedRequestsInput
  implements Prisma.UserUpdateOneWithoutApprovedRequestsInput
{
  @Field(() => UserWhereUniqueInput)
  connect?: Prisma.UserWhereUniqueInput;
}
