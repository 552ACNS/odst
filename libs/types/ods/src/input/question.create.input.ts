import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { QuestionWhereUniqueInput } from './question.unique.input';
import { SurveyCreateNestedManyWithoutQuestionsInput } from './survey.create.input';

@InputType()
export class QuestionCreateInput implements Prisma.QuestionCreateInput {
  id?: string;
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
  extends QuestionCreateNested
  implements Prisma.QuestionCreateNestedManyWithoutSurveysInput {}
