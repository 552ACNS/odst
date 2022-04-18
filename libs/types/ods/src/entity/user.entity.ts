import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Role, User } from '.prisma/ods/client';

@ObjectType()
export class UserGQL implements User {
  firstName: string;
  lastName: string;

  @Field(() => Role)
  role: Role;
  id: string;
  email: string;
  enabled: boolean;

  @HideField()
  password: string;
}
