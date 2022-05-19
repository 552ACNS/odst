import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { SurveyResponse, Tags } from '.prisma/ods/client';

@ObjectType()
export class SurveyResponseGQL implements SurveyResponse {
  id: string;

  @HideField()
  surveyId: string;
  openedDate: Date;
  closedDate: Date | null;
  routeOutside: boolean;
  resolution: string | null;

  @Field(() => Tags)
  tags: Tags;
}

@ObjectType()
export class ResponseCount {
  unresolved: number;
  overdue: number;
  resolved: number;
}
