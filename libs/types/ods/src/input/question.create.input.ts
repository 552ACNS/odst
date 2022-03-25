import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { QuestionWhereUniqueInput } from './question.unique.input';
import { SurveyCreateNestedOneWithoutQuestionsInput } from './survey.create.input';

@InputType()
export class QuestionCreateInput implements Prisma.QuestionCreateInput {
  id?: string;
  prompt: string;
  @Field(() => SurveyCreateNestedOneWithoutQuestionsInput )
  survey?: Prisma.SurveyCreateNestedOneWithoutQuestionsInput ;
}

@InputType()
export class QuestionCreateNestedManyWithoutSurveyInput
  implements Prisma.QuestionCreateNestedManyWithoutSurveyInput
{
  @Field(() => QuestionWhereUniqueInput, { nullable: true })
  connect?: Prisma.QuestionWhereUniqueInput;
}
