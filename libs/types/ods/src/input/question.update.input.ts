import {
  QuestionCreateInput,
  QuestionCreateOrConnectWithoutSurveysInput,
} from './question.create.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { QuestionWhereUniqueInput } from './question.unique.input';

@InputType()
export class QuestionUpdateInput
  extends PartialType(QuestionCreateInput)
  implements Prisma.QuestionUpdateInput {}

@InputType()
export class QuestionUpdateManyWithoutSurveysInput
  implements Prisma.QuestionUpdateManyWithoutSurveysInput
{
  @Field(() => [QuestionWhereUniqueInput], { nullable: true })
  connect?: Prisma.Enumerable<Prisma.QuestionWhereUniqueInput>;

  @Field(() => [QuestionCreateOrConnectWithoutSurveysInput], { nullable: true })
  connectOrCreate?: Prisma.Enumerable<Prisma.QuestionCreateOrConnectWithoutSurveysInput>;
}
