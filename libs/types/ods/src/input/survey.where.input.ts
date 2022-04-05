import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { OrgListRelationFilter } from './org.where.input';
import { QuestionListRelationFilter } from './question.where.input';
import { SurveyResponseListRelationFilter } from './surveyResponse.where.input';
import { SurveyWhereUniqueInput } from './survey.unique.input';

@InputType()
export class SurveyWhereInput
  extends SurveyWhereUniqueInput
  implements Prisma.SurveyWhereInput
{
  @Field(() => OrgListRelationFilter)
  orgs?: Prisma.OrgListRelationFilter;

  @Field(() => QuestionListRelationFilter)
  questions?: Prisma.QuestionListRelationFilter;

  @Field(() => SurveyResponseListRelationFilter)
  surveyResponses?: Prisma.SurveyResponseListRelationFilter;
}

@InputType()
export class SurveyListRelationFilter
  implements Prisma.SurveyListRelationFilter
{
  @Field(() => SurveyWhereInput)
  every?: Prisma.SurveyWhereInput;

  @Field(() => SurveyWhereInput)
  some?: Prisma.SurveyWhereInput;

  @Field(() => SurveyWhereInput)
  none?: Prisma.SurveyWhereInput;
}
