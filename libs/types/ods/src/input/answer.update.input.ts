import { InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { AnswerCreateInput } from './answer.create.input';

@InputType()
export class AnswerUpdateInput
  extends PartialType(AnswerCreateInput)
  implements Prisma.AnswerUpdateInput {}
