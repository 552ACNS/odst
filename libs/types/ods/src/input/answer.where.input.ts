import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { AnswerWhereUniqueInput } from './answer.unique.input';
import { SurveyResponseRelationFilter } from './surveyResponse.where.input';
import { StringFilter } from '../reusables/reusables.input';
import { QuestionRelationFilter } from './question.where.input';

@InputType()
export class AnswerWhereInput
  extends AnswerWhereUniqueInput
  implements Prisma.AnswerWhereInput
{
  @Field(() => StringFilter)
  value?: Prisma.StringFilter;

  @Field(() => QuestionRelationFilter)
  question?: Prisma.QuestionRelationFilter;

  @Field(() => [SurveyResponseRelationFilter])
  surveyResponse?: Prisma.SurveyResponseRelationFilter;
}

@InputType()
export class AnswerListRelationFilter
  implements Prisma.AnswerListRelationFilter
{
  @Field(() => AnswerWhereInput)
  every?: Prisma.AnswerWhereInput;

  @Field(() => AnswerWhereInput)
  some?: Prisma.AnswerWhereInput;

  @Field(() => AnswerWhereInput)
  none?: Prisma.AnswerWhereInput;
}
