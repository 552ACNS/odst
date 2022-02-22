import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { RefreshToken } from '@prisma/client';

@ObjectType()
@InputType('RefreshTokenGQLInput')
export class RefreshTokenGQL implements RefreshToken {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  isRevoked: boolean;

  @Field(() => Date)
  issued: Date;

  @Field(() => Date)
  expires: Date;

  @Field(() => String)
  userId: string;

  hash: string;
}
