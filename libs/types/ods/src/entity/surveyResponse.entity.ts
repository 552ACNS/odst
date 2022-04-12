import { ObjectType, HideField } from '@nestjs/graphql';
import { SurveyResponse } from '.prisma/ods/client';

@ObjectType()
export class SurveyResponseGQL implements SurveyResponse {
  id: string;

  @HideField()
  surveyId: string;
  openedDate: Date;
  closedDate: Date | null;
  routeOutside: boolean;
  resolution: string | null;
}
