import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { QuestionUpdateManyWithoutSurveysInput } from './question.update.input';
import { SurveyResponseCreateInput } from './surveyResponse.create.input';

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
  //TODO might not be the right type, since SurveyResponseCreateInput requires survey input
  @Field(() => [SurveyResponseCreateInput])
  data: Prisma.Enumerable<Prisma.SurveyResponseCreateManySurveyInput>;
  skipDuplicates?: boolean;
}
