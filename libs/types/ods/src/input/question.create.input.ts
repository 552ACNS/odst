import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { QuestionWhereUniqueInput } from './question.unique.input';
import { SurveyCreateNestedManyWithoutQuestionsInput } from './survey.create.input';
import { AnswerCreateNestedManyWithoutQuestionInput } from './answer.create.input';

@InputType()
export class QuestionCreateInput implements Prisma.QuestionCreateInput {
  prompt: string;

  @Field(() => SurveyCreateNestedManyWithoutQuestionsInput)
  surveys?: Prisma.SurveyCreateNestedManyWithoutQuestionsInput;
}

@InputType()
export class QuestionCreateNested {
  @Field(() => QuestionWhereUniqueInput)
  connect?: Prisma.QuestionWhereUniqueInput;
}

@InputType()
export class QuestionCreateNestedOneWithoutAnswersInput
  extends QuestionCreateNested
  implements Prisma.QuestionCreateNestedOneWithoutAnswersInput {}

@InputType()
export class QuestionCreateNestedManyWithoutSurveysInput
  implements Prisma.QuestionCreateNestedManyWithoutSurveysInput
{
  @Field(() => [QuestionWhereUniqueInput])
  connect?: Prisma.Enumerable<Prisma.QuestionWhereUniqueInput>;
}

@InputType()
export class QuestionCreateOrConnectWithoutSurveysInput
  implements Prisma.QuestionCreateOrConnectWithoutSurveysInput
{
  @Field(() => QuestionWhereUniqueInput)
  where: Prisma.OrgWhereUniqueInput;

  @Field(() => QuestionCreateWithoutSurveysInput)
  create: Prisma.QuestionCreateWithoutSurveysInput;
}

@InputType()
export class QuestionCreateWithoutSurveysInput
  implements Prisma.QuestionCreateWithoutSurveysInput
{
  prompt: string;

  @Field(() => AnswerCreateNestedManyWithoutQuestionInput)
  answers?: Prisma.AnswerCreateNestedManyWithoutQuestionInput;
}
