import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { RefreshToken } from '@prisma/client';

@ObjectType()
@InputType('RefreshTokenGQLInput')
export class RefreshTokenGQL implements RefreshToken {
  @Field(() => String, { nullable: true })
  id: string;
  isRevoked: boolean;
  issued: Date;
  expires: Date;
  userId: string;
  hash: string;
}
