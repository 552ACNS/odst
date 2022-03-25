import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { SurveyCreateNestedOneWithoutSurveyResponsesInput } from './survey.create.input';
import { SurveyResponseWhereUniqueInput } from './surveyResponse.unique.input';
import { SurveyResponseGQL } from '../entity/surveyResponse.entity';

@InputType()
export class SurveyResponseCreateInput
  implements Prisma.SurveyResponseCreateInput
{
  @Field(() => SurveyCreateNestedOneWithoutSurveyResponsesInput)
  survey: Prisma.SurveyCreateNestedOneWithoutSurveyResponsesInput;
  openedDate?: Date;
  closedDate?: Date;
  answers?: string[];
  routeOutside?: boolean;
  resolution?: string;
}

@InputType()
export class SurveyResponseCreateNestedManyWithoutSurveyInput
  implements Prisma.SurveyResponseCreateNestedManyWithoutSurveyInput
{
  @Field(() => SurveyResponseWhereUniqueInput, { nullable: true })
  connect?: Prisma.SurveyResponseWhereUniqueInput;

  @Field(() => SurveyResponseCreateOrConnectWithoutSurveyInput, { nullable: true })
  connectOrCreate?: Prisma.SurveyResponseCreateOrConnectWithoutSurveyInput;
}

@InputType()
export class SurveyResponseCreateOrConnectWithoutSurveyInput {
  @Field(() => SurveyResponseWhereUniqueInput)
  where: Prisma.SurveyResponseWhereUniqueInput;

  @Field(() => SurveyResponseGQL)
  create: SurveyResponseGQL;
}
