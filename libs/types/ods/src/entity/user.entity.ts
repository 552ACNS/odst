import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Role, User } from '.prisma/ods/client';

@ObjectType()
export class UserGQL implements User {
  id: string;
  email: string;
  enabled: boolean;

  @Field(() => Role)
  roles: Role;

  @HideField()
  password: string;
}
