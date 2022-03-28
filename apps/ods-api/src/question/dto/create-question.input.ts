import { InputType, Int, Field } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';

@InputType()
export class QuestionCreateInput implements Prisma.QuestionCreateInput {
  id?: string;
  prompt: string;
  survey?: Prisma.SurveyCreateNestedManyWithoutQuestionsInput;
}

// TODO: Move to right place
@InputType()
export class SurveyCreateNestedManyWithoutQuestionsInput
  implements Prisma.SurveyCreateNestedManyWithoutQuestionsInput
{
  @Field(() => SurveyWhereUniqueInput, { nullable: true })
  connect: Prisma.SurveyWhereUniqueInput;
}

@InputType()
export class SurveyWhereUniqueInput implements Prisma.SurveyWhereUniqueInput {
  id?: string;
}
