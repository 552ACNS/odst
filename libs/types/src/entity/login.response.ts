import { Field, ObjectType } from '@nestjs/graphql';
import { RefreshToken } from '@prisma/client';
import { RefreshTokenGQL } from '..';
import { UserGQL } from './user.entity';

@ObjectType()
export class LoginResponseGQL {
  @Field()
  accessToken: string;

  @Field(() => RefreshTokenGQL)
  refreshToken: RefreshToken;

  @Field(() => UserGQL)
  user: UserGQL;
}
