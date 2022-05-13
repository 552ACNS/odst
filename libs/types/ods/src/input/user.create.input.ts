import { InputType, Field } from '@nestjs/graphql';
import { Prisma, Role } from '.prisma/ods/client';
import { OrgWhereUniqueInput } from './org.unique.input';
import { OrgCreateNestedManyWithoutUsersInput } from './org.create.input';
import { UserWhereUniqueInput } from './user.unique.input';

@InputType()
export class UserCreateInput implements Prisma.UserCreateInput {
  email: string;
  password: string;
  grade?: string;
  firstName: string;
  lastName: string;
  enabled?: boolean;

  @Field(() => Role)
  role: Role;
  @Field(() => OrgCreateNestedManyWithoutUsersInput)
  orgs: Prisma.OrgCreateNestedManyWithoutUsersInput;

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
@InputType()
export class UserCreateNestedOneWithoutCommentsInput
  implements Prisma.UserCreateNestedOneWithoutCommentsInput
{
  @Field(() => UserWhereUniqueInput)
  connect?: Prisma.UserWhereUniqueInput;
}
