import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { SurveyResponse } from '.prisma/ods/client';

@ObjectType()
@InputType('SurveyResponseGQLInput')
export class SurveyResponseGQL implements SurveyResponse {
  @Field(() => String, { nullable: true })
  id: string;
  surveyId: string;
  openedDate: Date;
  closedDate: Date | null;
  routeOutside: boolean;
  resolution: string | null;
}
