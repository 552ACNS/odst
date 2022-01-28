import { Field, ObjectType } from '@nestjs/graphql';
import { RefreshToken } from '@prisma/client';
import { UserGQL } from './user.entity';

@ObjectType()
export class LoginResponseGQL {
  @Field()
  accessToken: string;

  @Field(() => RefreshToken)
  refreshToken: RefreshToken;

  @Field(() => UserGQL)
  user: UserGQL;
}
