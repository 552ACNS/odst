import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Answer } from '.prisma/ods/client';
import { QuestionGQL } from './question.entity';

@ObjectType()
@InputType('AnswerGQLInput')
export class AnswerGQL implements Answer {
  @Field(() => String, { nullable: true })
  id: string;
  value: string;
  questionId: string;
  surveyResponseId: string;

  @Field(() => QuestionGQL, { nullable: true })
  question?: QuestionGQL;
}
