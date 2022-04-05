import { ObjectType, InputType } from '@nestjs/graphql';
import { SurveyResponse } from '.prisma/ods/client';
import { AnswerGQL } from './answer.entity';

@ObjectType()
@InputType('SurveyResponseGQLInput')
export class SurveyResponseGQL implements SurveyResponse {
  id: string;
  surveyId: string;
  openedDate: Date;
  closedDate: Date | null;
  routeOutside: boolean;
  resolution: string | null;

  @Field(() => [AnswerGQL], {nullable: true})
  answers: AnswerGQL[];
}