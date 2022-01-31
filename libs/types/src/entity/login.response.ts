import { Field, ObjectType } from '@nestjs/graphql';
import { RefreshTokenGQL } from '..';
import { UserGQL } from './user.entity';

@ObjectType()
export class LoginResponseGQL {
  @Field()
  accessToken: string;

  @Field(() => RefreshTokenGQL)
  refreshToken: RefreshTokenGQL;

  @Field(() => UserGQL)
  user: UserGQL;
}
