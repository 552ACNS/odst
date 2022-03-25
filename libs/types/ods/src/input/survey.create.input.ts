import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { SurveyWhereUniqueInput } from './survey.unique.input';
import { OrgCreateNestedManyWithoutSurveysInput } from './org.create.input';
import { SurveyResponseCreateNestedManyWithoutSurveyInput } from './surveyResponse.create.input';
import { QuestionCreateNestedManyWithoutSurveyInput } from './question.create.input';

@InputType()
export class SurveyCreateInput implements Prisma.SurveyCreateInput {
  @Field(() => OrgCreateNestedManyWithoutSurveysInput)
  orgs?: Prisma.OrgCreateNestedManyWithoutSurveysInput;

  @Field(() => QuestionCreateNestedManyWithoutSurveyInput)
  questions?: Prisma.QuestionCreateNestedManyWithoutSurveyInput;

  @Field(() => SurveyResponseCreateNestedManyWithoutSurveyInput)
  surveyResponses?: Prisma.SurveyResponseCreateNestedManyWithoutSurveyInput;
}

@InputType()
export class SurveyCreateNestedMany {
  @Field(() => SurveyWhereUniqueInput, { nullable: true })
  connect?: Prisma.SurveyWhereUniqueInput;
}

@InputType()
export class SurveyCreateNestedManyWithoutOrgsInput
  extends SurveyCreateNestedMany
  implements Prisma.SurveyCreateNestedManyWithoutOrgsInput {}

@InputType()
export class SurveyCreateNestedOneWithoutSurveyResponsesInput
  extends SurveyCreateNestedMany
  implements Prisma.SurveyCreateNestedOneWithoutSurveyResponsesInput {}
