import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';

@InputType()
export class CommentWhereUniqueInput implements Prisma.CommentWhereUniqueInput {
  id?: string;
}
