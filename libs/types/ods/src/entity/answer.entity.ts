import { ObjectType, HideField } from '@nestjs/graphql';
import { Answer } from '.prisma/ods/client';

@ObjectType()
export class AnswerGQL implements Answer {
  id: string;
  value: string;

  @HideField()
  questionId: string;

  @HideField()
  surveyResponseId: string;
}
