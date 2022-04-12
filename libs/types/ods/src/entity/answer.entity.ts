import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { Answer } from '.prisma/ods/client';
import { QuestionGQL } from './question.entity';

@ObjectType()
export class AnswerGQL implements Answer {
  id: string;
  value: string;

  @HideField()
  questionId: string;

  @HideField()
  surveyResponseId: string;
}
