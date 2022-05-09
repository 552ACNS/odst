import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { SurveyResponse, Comment } from '.prisma/ods/client';

@ObjectType()
export class SurveyResponseGQL implements SurveyResponse {
  id: string;

  @HideField()
  surveyId: string;
  openedDate: Date;
  closedDate: Date | null;
  routeOutside: boolean;
  resolved: boolean;

  @Field(() => Comment)
  comments: Comment[];
}

@ObjectType()
export class ResponseCount {
  unresolved: number;
  overdue: number;
  resolved: number;
}
