import { ObjectType, InputType } from '@nestjs/graphql';
import { RefreshToken } from '.prisma/waypoint/client';
//TODO Do we need to make this more generic, dependent on waypoint prisma schema currently. We can't reuse because it relies on this prisma

@ObjectType()
@InputType('RefreshTokenGQLInput')
export class RefreshTokenGQL implements RefreshToken {
  id: string;
  isRevoked: boolean;
  issued: Date;
  expires: Date;
  userId: string;
  hash: string;
}
