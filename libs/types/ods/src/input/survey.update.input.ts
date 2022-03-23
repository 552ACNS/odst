import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';

@InputType()
export class SurveyUpdateInput implements Prisma.SurveyUpdateInput {
  @Field(() => OrgUpdateManyWithoutSurveysInput)
  orgs?: Prisma.OrgUpdateManyWithoutSurveysInput;


  @Field(() => QuestionUpdateManyWithoutSurveyInput)
  questions?: Prisma.QuestionUpdateManyWithoutSurveyInput;


  @Field(() => SurveyResponseUpdateManyWithoutSurveyInput)
  surveyResponses?: Prisma.SurveyResponseUpdateManyWithoutSurveyInput;
}
