import { ObjectType, HideField, Field } from '@nestjs/graphql';
import { SurveyResponse } from '.prisma/ods/client';
import { AnswerGQL } from './answer.entity';

@ObjectType()
export class SurveyResponseGQL implements SurveyResponse {
  id: string;

  @HideField()
  surveyId: string;
  openedDate: Date;
  closedDate: Date | null;
  routeOutside: boolean;
  resolution: string | null;

  @Field(() => [AnswerGQL], { nullable: true })
  answers: AnswerGQL[];
}
