import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/client';

  // Uniquely identify a person with these fields. Only pass 1 of these fields, will cause exception otherwise.
@InputType()
export class RefreshTokenWhereUniqueInput implements Prisma.RefreshTokenWhereUniqueInput {
    id?: string;
    hash?: string
}

@InputType()
export class RefreshTokenWhereInput extends RefreshTokenWhereUniqueInput {
  userId: string
}
