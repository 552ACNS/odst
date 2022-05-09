import { InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { CommentCreateInput } from './comment.create.input';

@InputType()
export class CommentUpdateInput
  extends PartialType(CommentCreateInput)
  implements Prisma.CommentUpdateInput {}
