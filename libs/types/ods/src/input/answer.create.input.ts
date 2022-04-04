import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { QuestionCreateNestedOneWithoutAnswersInput } from './question.create.input';
import { SurveyResponseCreateNestedOneWithoutAnswersInput } from './surveyResponse.create.input';
import { AnswerWhereUniqueInput } from './answer.unique.input';

@InputType()
export class AnswerCreateInput implements Prisma.AnswerCreateInput {
  value: string;

  @Field(() => QuestionCreateNestedOneWithoutAnswersInput)
  question: Prisma.QuestionCreateNestedOneWithoutAnswersInput;

  @Field(() => SurveyResponseCreateNestedOneWithoutAnswersInput)
  surveyResponse: Prisma.SurveyResponseCreateNestedOneWithoutAnswersInput;
}

@InputType()
export class AnswerCreateNestedManyWithoutSurveyResponseInput
  implements Prisma.AnswerCreateNestedManyWithoutSurveyResponseInput
{
  @Field(() => AnswerWhereUniqueInput, { nullable: true })
  connect?: AnswerWhereUniqueInput;

  @Field(() => AnswerCreateInput, { nullable: true })
  create?: Prisma.AnswerCreateWithoutSurveyResponseInput;
}
