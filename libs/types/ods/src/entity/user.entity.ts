import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Role, User } from '.prisma/ods/client';

@ObjectType()
export class UserGQL implements User {
  id: string;
  email: string;
  grade: string | null;
  firstName: string;
  lastName: string;
  enabled: boolean;

  @Field(() => Role)
  role: Role;

  @HideField()
  password: string;
}
