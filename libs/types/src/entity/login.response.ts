import { Field, ObjectType } from '@nestjs/graphql';
import { UserGQL } from './user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field(() => UserGQL)
  user: UserGQL;
}
