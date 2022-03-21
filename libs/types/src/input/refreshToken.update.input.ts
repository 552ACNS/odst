import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class RefreshTokenUpdateInput implements Prisma.RefreshTokenUpdateInput {
  isRevoked?: boolean
}
