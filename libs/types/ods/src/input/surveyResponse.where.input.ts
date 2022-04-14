import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { SurveyWhereInput } from './survey.where.input';
import { AnswerListRelationFilter } from './answer.where.input';
import { SurveyResponseWhereUniqueInput } from './surveyResponse.unique.input';
import {
  DateTimeFilter,
  DateTimeNullableFilter,
  StringNullableFilter,
} from '../reusables/reusables.input';

@InputType()
export class SurveyResponseWhereInput
  extends SurveyResponseWhereUniqueInput
  implements Prisma.SurveyResponseWhereInput
{
  @Field(() => SurveyWhereInput)
  survey?: Prisma.SurveyWhereInput;

  @Field(() => DateTimeFilter)
  openedDate?: Prisma.DateTimeFilter;

  @Field(() => DateTimeNullableFilter)
  closedDate?: Prisma.DateTimeNullableFilter;

  @Field(() => AnswerListRelationFilter)
  answers?: Prisma.AnswerListRelationFilter;
  routeOutside?: boolean;

  @Field(() => StringNullableFilter)
  resolution?: Prisma.StringNullableFilter;
}

@InputType()
export class SurveyResponseListRelationFilter
  implements Prisma.SurveyResponseListRelationFilter
{
  @Field(() => SurveyResponseWhereInput)
  every?: Prisma.SurveyResponseWhereInput;

  @Field(() => SurveyResponseWhereInput)
  some?: Prisma.SurveyResponseWhereInput;

  @Field(() => SurveyResponseWhereInput)
  none?: Prisma.SurveyResponseWhereInput;
}

@InputType()
export class SurveyResponseRelationFilter
  implements Prisma.SurveyResponseRelationFilter
{
  @Field(() => SurveyResponseWhereInput)
  is?: Prisma.SurveyResponseWhereInput;

  @Field(() => SurveyResponseWhereInput)
  isNot?: Prisma.SurveyResponseWhereInput;
}
