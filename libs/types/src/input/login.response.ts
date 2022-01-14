import { Field, ObjectType } from '@nestjs/graphql';
import { UserGQL } from '../entity/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field(() => UserGQL)
  user: UserGQL;
}
