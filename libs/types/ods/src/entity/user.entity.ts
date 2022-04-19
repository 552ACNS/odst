import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Role, User } from '.prisma/ods/client';

@ObjectType()
export class UserGQL implements User {
  rank: string | null;
  firstName: string;
  lastName: string;

  @Field(() => Role)
  id: string;
  email: string;
  enabled: boolean;

  @Field(() => Role)
  role: Role | null;

  @HideField()
  password: string;
}
