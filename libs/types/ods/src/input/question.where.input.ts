import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { QuestionWhereUniqueInput } from './question.unique.input';
import { AnswerListRelationFilter } from './answer.where.input';
import { SurveyListRelationFilter } from './survey.where.input';

@InputType()
export class QuestionWhereInput
  extends QuestionWhereUniqueInput
  implements Prisma.QuestionWhereInput
{
  //TODO move to unique
  prompt?: string;

  @Field(() => SurveyListRelationFilter)
  surveys?: Prisma.SurveyListRelationFilter;

  @Field(() => AnswerListRelationFilter)
  answers?: Prisma.AnswerListRelationFilter;
}

@InputType()
export class QuestionListRelationFilter
  implements Prisma.QuestionListRelationFilter
{
  @Field(() => QuestionWhereInput)
  every?: Prisma.QuestionWhereInput;

  @Field(() => QuestionWhereInput)
  some?: Prisma.QuestionWhereInput;

  @Field(() => QuestionWhereInput)
  none?: Prisma.QuestionWhereInput;
}

@InputType()
export class QuestionRelationFilter implements Prisma.QuestionRelationFilter {
  @Field(() => QuestionWhereInput)
  is?: Prisma.QuestionWhereInput;

  @Field(() => QuestionWhereInput)
  isNot?: Prisma.QuestionWhereInput;
}
