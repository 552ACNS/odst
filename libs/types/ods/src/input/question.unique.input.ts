import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { QuestionGQL } from '../entity/question.entity';

@InputType()
export class QuestionWhereUniqueInput
  implements Prisma.QuestionWhereUniqueInput
{
  id?: string;
  prompt?: string;
}

@InputType()
export class QuestionUpdateManyWithoutSurveysInput
  implements Prisma.QuestionUpdateManyWithoutSurveysInput
{
  @Field(() => [QuestionWhereUniqueInput], { nullable: true })
  connect?: Prisma.Enumerable<Prisma.QuestionWhereUniqueInput>;

  @Field(() => [QuestionCreateOrConnectWithoutSurveysInput], { nullable: true })
  connectOrCreate?: Prisma.Enumerable<Prisma.QuestionCreateOrConnectWithoutSurveysInput>;
}

@InputType()
export class QuestionCreateOrConnectWithoutSurveysInput
  implements Prisma.QuestionCreateOrConnectWithoutSurveysInput
{
  @Field(() => QuestionWhereUniqueInput)
  where: Prisma.OrgWhereUniqueInput;

  @Field(() => QuestionGQL)
  create: QuestionGQL;
}
