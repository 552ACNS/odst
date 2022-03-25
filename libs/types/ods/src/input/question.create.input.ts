import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { QuestionWhereUniqueInput } from './question.unique.input';

@InputType()
export class QuestionCreateNestedManyWithoutSurveyInput
  implements Prisma.QuestionCreateNestedManyWithoutSurveyInput
{
  @Field(() => QuestionWhereUniqueInput, { nullable: true })
  connect?: Prisma.QuestionWhereUniqueInput;

  @Field(() => QuestionCreateNestedManyWithoutSurveyInput, { nullable: true })
  connectOrCreate?: Prisma.QuestionCreateOrConnectWithoutSurveyInput;
}


QuestionCreateNestedManyWithoutSurveyInput
