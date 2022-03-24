import { InputType, Field } from '@nestjs/graphql';
import { Prisma, Role } from '.prisma/ods/client';

@InputType()
export class UserCreateInput implements Prisma.UserCreateInput {
  email: string;
  password: string;

  enabled?: boolean;

  @Field(() => Role)
  roles: Role;

  //TODO org

  //TODO refreshtoken
  // @Field(() => RefreshTokenCreateNestedManyWithoutUserInput)
  // refreshTokens?: Prisma.RefreshTokenCreateNestedManyWithoutUserInput;
}



@InputType()
export class UserCreateNestedManyWithoutOrgsInput
  implements Prisma.UserCreateNestedManyWithoutOrgsInput {
  //TODO stubbed
}
