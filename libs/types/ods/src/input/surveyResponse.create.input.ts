import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { SurveyCreateNestedOneWithoutSurveyResponsesInput } from './survey.create.input';
import { SurveyResponseWhereUniqueInput } from './surveyResponse.unique.input';
import { AnswerCreateNestedManyWithoutSurveyResponseInput } from './answer.create.input';

@InputType()
export class SurveyResponseCreateInput
  implements Prisma.SurveyResponseCreateInput
{
  @Field(() => SurveyCreateNestedOneWithoutSurveyResponsesInput)
  survey: Prisma.SurveyCreateNestedOneWithoutSurveyResponsesInput;

  @Field(() => AnswerCreateNestedManyWithoutSurveyResponseInput)
  answers?: Prisma.AnswerCreateNestedManyWithoutSurveyResponseInput;

  routeOutside?: boolean;
}

@InputType()
export class SurveyResponseCreateNestedManyWithoutSurveyInput
  implements Prisma.SurveyResponseCreateNestedManyWithoutSurveyInput
{
  @Field(() => SurveyResponseWhereUniqueInput, { nullable: true })
  connect?: Prisma.SurveyResponseWhereUniqueInput;

  @Field(() => SurveyResponseCreateInput, { nullable: true })
  create?: Prisma.SurveyResponseCreateWithoutSurveyInput;
}

@InputType()
export class SurveyResponseCreateNestedOneWithoutAnswersInput
  implements Prisma.SurveyResponseCreateNestedOneWithoutAnswersInput
{
  @Field(() => SurveyResponseWhereUniqueInput, { nullable: true })
  connect?: Prisma.SurveyResponseWhereUniqueInput;

  @Field(() => SurveyResponseCreateInput, { nullable: true })
  create?: Prisma.SurveyResponseCreateWithoutAnswersInput;
}
