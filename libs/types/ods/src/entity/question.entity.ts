import { ObjectType } from '@nestjs/graphql';
import { Question } from '.prisma/ods/client';

@ObjectType()
export class QuestionGQL implements Question {
  id: string;
  prompt: string;
}
