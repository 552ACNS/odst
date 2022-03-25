import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { SurveyCreateNestedOneWithoutSurveyResponsesInput } from './survey.create.input';
import { SurveyResponseWhereUniqueInput } from './surveyResponse.unique.input';

@InputType()
export class SurveyResponseCreateInput
  implements Prisma.SurveyResponseCreateInput
{
  @Field(() => SurveyCreateNestedOneWithoutSurveyResponsesInput)
  survey: Prisma.SurveyCreateNestedOneWithoutSurveyResponsesInput;
  openedDate?: Date;
  closedDate?: Date;
  answers?: string[];
  routeOutside?: boolean;
  resolution?: string;
}

@InputType()
export class SurveyResponseCreateNestedManyWithoutSurveyInput
  implements Prisma.SurveyResponseCreateNestedManyWithoutSurveyInput
{
  @Field(() => SurveyResponseWhereUniqueInput, { nullable: true })
  connect?: Prisma.SurveyResponseWhereUniqueInput;
}
