import { ObjectType, InputType } from '@nestjs/graphql';
import { Survey } from '.prisma/ods/client';

@ObjectType()
@InputType('SurveyGQLInput')
export class SurveyGQL implements Survey {
  id: string;
  questionsHash: string | null;
}
