import { Field, ObjectType } from '@nestjs/graphql';
import { UserGQL } from './user.entity';

@ObjectType()
export class RefreshToken {
  @Field()
  is_revoked: boolean

  @Field()
  expires: Date

  @Field(() => UserGQL)
  user: UserGQL;
}
