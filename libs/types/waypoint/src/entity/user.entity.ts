import { ObjectType, Field, InputType, HideField } from '@nestjs/graphql';
import { User } from '.prisma/waypoint/client';

@ObjectType()
@InputType('UserGQLInput')
export class UserGQL implements User {
  @Field(() => String, { nullable: true })
  id: string;
  username: string;
  personId: string;
  enabled: boolean;

  @HideField()
  password: string;
}
