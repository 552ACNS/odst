import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { SurveyWhereUniqueInput } from './survey.unique.input';
import { SurveyResponseGQL } from '../entity/surveyResponse.entity';
import { SurveyResponseWhereUniqueInput } from './surveyResponse.unique.input';
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
  surveyResponses?: Prisma.SurveyResponseCreateNestedManyWithoutSurveyInput
}

@InputType()
export class SurveyCreateNestedManyWithoutOrgsInput
  implements Prisma.SurveyCreateNestedManyWithoutOrgsInput
{
  @Field(() => SurveyWhereUniqueInput, { nullable: true })
  connect?: Prisma.SurveyWhereUniqueInput;

  @Field(() => SurveyCreateNestedManyWithoutOrgsInput, { nullable: true })
  connectOrCreate?: Prisma.SurveyCreateOrConnectWithoutOrgsInput;
}

@InputType()
export class SurveyCreateNestedOneWithoutSurveyResponsesInput
  implements Prisma.SurveyCreateNestedOneWithoutSurveyResponsesInput
{
  @Field(() => SurveyWhereUniqueInput, { nullable: true })
  connect?: Prisma.SurveyWhereUniqueInput;

  @Field(() => SurveyCreateOrConnectWithoutSurveyResponsesInput, {
    nullable: true,
  })
  connectOrCreate?: Prisma.SurveyCreateOrConnectWithoutSurveyResponsesInput;
}

@InputType()
export class SurveyCreateOrConnectWithoutSurveyResponsesInput {
  @Field(() => SurveyResponseWhereUniqueInput)
  where: Prisma.SurveyResponseWhereUniqueInput;

  @Field(() => SurveyResponseGQL)
  create: SurveyResponseGQL;
}
