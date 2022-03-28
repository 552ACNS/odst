import { ObjectType, Field, InputType, HideField } from '@nestjs/graphql';
import { Role, User } from '.prisma/ods/client';

@ObjectType()
@InputType('UserGQLInput')
export class UserGQL implements User {
  @Field(() => String, { nullable: true })
  id: string;
  email: string;
  enabled: boolean;
  roles: Role;

  @HideField()
  password: string;
}
