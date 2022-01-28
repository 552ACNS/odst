import { Field, InputType } from '@nestjs/graphql';
import { UserGQL } from '../entity/user.entity'

@InputType()
export class RefreshTokenCreateInput {
  @Field()
  is_revoked: boolean

  @Field()
  expires: Date

  @Field(() => UserGQL)
  user: UserGQL;
}
