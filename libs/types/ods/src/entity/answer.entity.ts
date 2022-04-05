import { ObjectType, InputType } from '@nestjs/graphql';
import { Answer } from '.prisma/ods/client';

@ObjectType()
@InputType('AnswerGQLInput')
export class AnswerGQL implements Answer {
  id: string;
  value: string;
  questionId: string;
  surveyResponseId: string;
}
