import { ObjectType, InputType, HideField } from '@nestjs/graphql';
import { User } from '.prisma/waypoint/client';

@ObjectType()
@InputType('UserGQLInput')
export class UserGQL implements User {
  id: string;
  username: string;
  personId: string;
  enabled: boolean;

  @HideField()
  password: string;
}
