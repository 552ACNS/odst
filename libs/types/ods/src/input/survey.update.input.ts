import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { OrgUpdateManyWithoutSurveysInput } from './org.update.input';
import { QuestionUpdateManyWithoutSurveyInput } from './question.update.input';
import { SurveyResponseUpdateManyWithoutSurveyInput } from './surveyResponse.update.input';

@InputType()
export class SurveyUpdateInput implements Prisma.SurveyUpdateInput {
  @Field(() => OrgUpdateManyWithoutSurveysInput)
  orgs?: Prisma.OrgUpdateManyWithoutSurveysInput;

  @Field(() => QuestionUpdateManyWithoutSurveyInput)
  questions?: Prisma.QuestionUpdateManyWithoutSurveyInput;

  @Field(() => SurveyResponseUpdateManyWithoutSurveyInput)
  surveyResponses?: Prisma.SurveyResponseUpdateManyWithoutSurveyInput;
}
