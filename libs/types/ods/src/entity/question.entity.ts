import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Question } from '.prisma/ods/client';

@ObjectType()
@InputType('QuestionGQLInput')
export class QuestionGQL implements Question {
  @Field(() => String, { nullable: true })
  id: string;
  prompt: string;
  surveyId: string | null;
}
