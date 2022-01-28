import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { RefreshToken } from '@prisma/client';

@ObjectType()
@InputType('RefreshTokenGQLInput')
export class RefreshTokenGQL implements RefreshToken{

  @Field()
  id: string;

  @Field()
  is_revoked: boolean

  @Field()
  expires: Date

  @Field(() => String)
  userId: string;
}
