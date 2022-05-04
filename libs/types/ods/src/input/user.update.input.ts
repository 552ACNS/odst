import { InputType, Field } from '@nestjs/graphql';
import { Prisma, Role } from '.prisma/ods/client';

@InputType()
export class UserUpdateInput implements Prisma.UserUpdateInput {
  grade?: string;
  email?: string;
  password?: string;
  enabled?: boolean;

  @Field(() => Role)
  roles: Role;

  //TODO refreshToken, org
}
