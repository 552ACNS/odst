import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { SurveyCreateNestedOneWithoutSurveyResponsesInput } from './survey.create.input';
import { SurveyResponseWhereUniqueInput } from './surveyResponse.unique.input';
import { AnswerCreateNestedManyWithoutSurveyResponseInput } from './answer.create.input';
import { TagCreateNestedManyWithoutSurveyResponsesInput } from './tag.create.input';

@InputType()
export class SurveyResponseCreateInput
  implements Prisma.SurveyResponseCreateInput
{
  @Field(() => SurveyCreateNestedOneWithoutSurveyResponsesInput)
  survey: Prisma.SurveyCreateNestedOneWithoutSurveyResponsesInput;

  @Field(() => AnswerCreateNestedManyWithoutSurveyResponseInput)
  answers?: Prisma.AnswerCreateNestedManyWithoutSurveyResponseInput;

  @Field(() => TagCreateNestedManyWithoutSurveyResponsesInput)
  tags?: Prisma.TagCreateNestedManyWithoutSurveyResponsesInput;
  openedDate?: Date;
  closedDate?: Date;
  routeOutside?: boolean;
  resolution?: string;
}

@InputType()
export class SurveyResponseCreateNestedManyWithoutSurveyInput
  implements Prisma.SurveyResponseCreateNestedManyWithoutSurveyInput
{
  @Field(() => SurveyResponseWhereUniqueInput)
  connect?: Prisma.SurveyResponseWhereUniqueInput;

  //TODO fix type
  // @Field(() => SurveyResponseGQL)
  // create?: Prisma.SurveyResponseCreateWithoutSurveyInput;
}

@InputType()
export class SurveyResponseCreateNestedOneWithoutAnswersInput
  implements Prisma.SurveyResponseCreateNestedOneWithoutAnswersInput
{
  @Field(() => SurveyResponseWhereUniqueInput)
  connect?: Prisma.SurveyResponseWhereUniqueInput;

  //TODO fix type
  // @Field(() => SurveyResponseGQL)
  // create?: Prisma.SurveyResponseCreateWithoutAnswersInput;
}
