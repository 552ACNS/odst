import { Field, ObjectType } from '@nestjs/graphql';
import { UserGQL } from '@odst/types';

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field(() => UserGQL)
  user: UserGQL;
}
