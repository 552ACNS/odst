import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { QuestionCreateNestedOneWithoutAnswersInput } from './question.create.input';
import { SurveyResponseCreateNestedOneWithoutAnswersInput } from './surveyResponse.create.input';
import { AnswerWhereUniqueInput } from './answer.unique.input';
import { AnswerGQL } from '../entity/answer.entity';

@InputType()
export class AnswerCreateInput implements Prisma.AnswerCreateInput {
  value: string;

  @Field(() => QuestionCreateNestedOneWithoutAnswersInput)
  question: Prisma.QuestionCreateNestedOneWithoutAnswersInput;

  @Field(() => SurveyResponseCreateNestedOneWithoutAnswersInput)
  surveyResponse: Prisma.SurveyResponseCreateNestedOneWithoutAnswersInput;
}

@InputType()
export class AnswerCreateWithoutSurveyResponseInput
  implements Prisma.AnswerCreateWithoutSurveyResponseInput
{
  value: string;

  @Field(() => QuestionCreateNestedOneWithoutAnswersInput)
  question: Prisma.QuestionCreateNestedOneWithoutAnswersInput;
}

@InputType()
export class AnswerCreateManySurveyResponseInput
  implements Prisma.AnswerCreateManySurveyResponseInput
{
  value: string;
  questionId: string;
}

@InputType()
export class AnswerCreateNestedManyWithoutSurveyResponseInput
  implements Prisma.AnswerCreateNestedManyWithoutSurveyResponseInput
{
  @Field(() => AnswerWhereUniqueInput, { nullable: true })
  connect?: Prisma.AnswerWhereUniqueInput;

  @Field(() => AnswerCreateWithoutSurveyResponseInput, { nullable: true })
  create?: Prisma.AnswerCreateWithoutSurveyResponseInput;

  @Field(() => AnswerCreateManySurveyResponseInputEnvelope, { nullable: true })
  createMany?: Prisma.AnswerCreateManySurveyResponseInputEnvelope;
}

@InputType()
export class AnswerCreateManySurveyResponseInputEnvelope
  implements Prisma.AnswerCreateManySurveyResponseInputEnvelope
{
  @Field(() => [AnswerCreateManySurveyResponseInput], { nullable: true })
  data: Prisma.Enumerable<Prisma.AnswerCreateManySurveyResponseInput>;

  skipDuplicates?: boolean;
}

@InputType()
export class AnswerCreateNestedManyWithoutQuestionInput
  implements Prisma.AnswerCreateNestedManyWithoutQuestionInput
{
  @Field(() => [AnswerWhereUniqueInput])
  connect?: Prisma.Enumerable<Prisma.AnswerWhereUniqueInput>;
}
