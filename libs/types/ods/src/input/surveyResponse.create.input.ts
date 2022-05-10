import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { SurveyCreateNestedOneWithoutSurveyResponsesInput } from './survey.create.input';
import { SurveyResponseWhereUniqueInput } from './surveyResponse.unique.input';
import { AnswerCreateNestedManyWithoutSurveyResponseInput } from './answer.create.input';
import { CommentCreateNestedManyWithoutSurveyResponseInput } from './comment.create.input';

@InputType()
export class SurveyResponseCreateInput
  implements Prisma.SurveyResponseCreateInput
{
  @Field(() => SurveyCreateNestedOneWithoutSurveyResponsesInput)
  survey: Prisma.SurveyCreateNestedOneWithoutSurveyResponsesInput;

  @Field(() => AnswerCreateNestedManyWithoutSurveyResponseInput)
  answers?: Prisma.AnswerCreateNestedManyWithoutSurveyResponseInput;

  @Field(() => CommentCreateNestedManyWithoutSurveyResponseInput)
  comments?:
    | Prisma.CommentCreateNestedManyWithoutSurveyResponseInput
    | undefined;
  openedDate?: Date;
  closedDate?: Date;
  routeOutside?: boolean;
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
@InputType()
export class SurveyResponseCreateNestedOneWithoutCommentsInput
  implements Prisma.SurveyResponseCreateNestedOneWithoutCommentsInput
{
  @Field(() => SurveyResponseWhereUniqueInput)
  connect?: Prisma.SurveyResponseWhereUniqueInput;

  //TODO fix type
  // @Field(() => SurveyResponseGQL)
  // create?: Prisma.SurveyResponseCreateWithoutAnswersInput;
}
