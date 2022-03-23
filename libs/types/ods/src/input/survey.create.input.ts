import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { OrgCreateNestedManyWithoutSurveysInput } from './org.create.input';
import { SurveyWhereUniqueInput } from './survey.unique.input';

@InputType()
export class SurveyCreateInput implements Prisma.SurveyCreateInput {
  @Field(() => OrgCreateNestedManyWithoutSurveysInput)
  orgs?: Prisma.OrgCreateNestedManyWithoutSurveysInput;

  // @Field(() => QuestionCreateNestedManyWithoutSurveyInput)
  // questions?: Prisma.QuestionCreateNestedManyWithoutSurveyInput;
}

export class SurveyCreateNestedManyWithoutOrgsInput implements Prisma.SurveyCreateNestedManyWithoutOrgsInput {
  @Field(() => SurveyWhereUniqueInput, { nullable: true })
  connect?: Prisma.SurveyWhereUniqueInput;

  @Field(() => SurveyCreateNestedManyWithoutOrgsInput, { nullable: true })
  connectOrCreate?: Prisma.SurveyCreateOrConnectWithoutOrgsInput;
}
