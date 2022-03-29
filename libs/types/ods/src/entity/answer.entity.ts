import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Answer } from '.prisma/ods/client';

@ObjectType()
@InputType('AnswerGQLInput')
export class AnswerGQL implements Answer {
  @Field(() => String, { nullable: true })
  id: string;
  value: string;
  questionId: string;
  surveyResponseId: string;
}