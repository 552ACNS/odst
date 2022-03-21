import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/waypoint/client';

@InputType()
export class RefreshTokenUpdateInput implements Prisma.RefreshTokenUpdateInput {
  @Field()
  isRevoked?: boolean
}
