import { ObjectType } from '@nestjs/graphql';
import { Survey } from '.prisma/ods/client';

@ObjectType()
export class SurveyGQL implements Survey {
  id: string;
}
