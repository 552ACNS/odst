import { QuestionCreateInput } from './create-question.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';


@InputType()
export class QuestionUpdateInput
  extends PartialType(QuestionCreateInput)
  implements Prisma.QuestionUpdateInput {}
