import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { SurveyResponseGQL } from '../entity/surveyResponse.entity';
import { QuestionUpdateManyWithoutSurveysInput } from './question.update.input';

@InputType()
// extends SurveyCreateInput
export class SurveyUpdateInput implements Prisma.SurveyUpdateInput {
  @Field(() => QuestionUpdateManyWithoutSurveysInput)
  questions?: Prisma.QuestionUpdateManyWithoutSurveysInput;

  @Field(() => SurveyResponseUpdateManyWithoutSurveyInput)
  surveyResponses?: Prisma.SurveyResponseUpdateManyWithoutSurveyInput;
}

@InputType()
export class SurveyResponseUpdateManyWithoutSurveyInput
  implements Prisma.SurveyResponseUpdateManyWithoutSurveyInput
{
  @Field(() => SurveyResponseCreateManySurveyInputEnvelope)
  createMany?: Prisma.SurveyResponseCreateManySurveyInputEnvelope;
}

@InputType()
export class SurveyResponseCreateManySurveyInputEnvelope
  implements Prisma.SurveyResponseCreateManySurveyInputEnvelope
{
  @Field(() => [SurveyResponseGQL], { nullable: true })
  data: Prisma.Enumerable<Prisma.SurveyResponseCreateManySurveyInput>;
  skipDuplicates?: boolean;
}

