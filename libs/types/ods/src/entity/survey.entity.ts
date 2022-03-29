import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Survey } from '.prisma/ods/client';

@ObjectType()
@InputType('SurveyGQLInput')
export class SurveyGQL implements Survey {
  @Field(() => String, { nullable: true })
  id: string;
}
