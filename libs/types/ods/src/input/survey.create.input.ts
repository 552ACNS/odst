import { Field, InputType } from '@nestjs/graphql';
import { OrgTier, Prisma } from '.prisma/ods/client';
import { OrgWhereUniqueInput } from './org.unique.input';
import { OrgCreateOrConnectWithoutSurveysInput } from './org.create.input';

@InputType()
export class SurveyCreateInput implements Prisma.SurveyCreateInput {
  @Field(() => OrgCreateNestedManyWithoutSurveysInput)
  orgs?: Prisma.OrgCreateNestedManyWithoutSurveysInput;

  // @Field(() => QuestionCreateNestedManyWithoutSurveyInput)
  // questions?: Prisma.QuestionCreateNestedManyWithoutSurveyInput;
}


@InputType()
export class OrgCreateNestedManyWithoutSurveysInput
  implements Prisma.OrgCreateNestedManyWithoutSurveysInput
{
  @Field(() => OrgWhereUniqueInput, { nullable: true })
  connect?: Prisma.OrgWhereUniqueInput;

  @Field(() => OrgCreateOrConnectWithoutSurveysInput, { nullable: true })
  connectOrCreate?: Prisma.OrgCreateOrConnectWithoutSurveysInput;
}


