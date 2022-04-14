import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';

@InputType()
export class QuestionWhereUniqueInput
  implements Prisma.QuestionWhereUniqueInput
{
  id?: string;
  prompt?: string;
}
