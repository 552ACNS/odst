import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { AccountRequest, Role } from '.prisma/ods/client';

@ObjectType()
export class AccountRequestGQL implements AccountRequest {
  id: string;
  email: string;
  rank: string | null;

  @HideField()
  password: string;
  firstName: string;
  lastName: string;
  date: Date;
  denied: boolean;

  @Field(() => Role)
  role: Role;

  @HideField()
  approverId: string | null;
}
