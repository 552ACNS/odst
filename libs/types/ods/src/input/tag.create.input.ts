import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { SurveyResponseCreateNestedManyWithoutSurveyInput } from './surveyResponse.create.input';
import { TagWhereUniqueInput } from './tag.unique.input';

@InputType()
export class TagCreateInput implements Prisma.TagCreateInput {
  value: string;

  @Field(() => SurveyResponseCreateNestedManyWithoutSurveyInput)
  surveyResponse: Prisma.SurveyResponseCreateNestedManyWithoutTagsInput;
}

@InputType()
export class TagCreateWithoutSurveyResponseInput
  implements Prisma.TagCreateWithoutSurveyResponsesInput
{
  value: string;
}

@InputType()
export class TagCreateManySurveyResponseInput
  implements Prisma.TagCreateManyInput
{
  value: string;
}

@InputType()
export class TagCreateNestedManyWithoutSurveyResponsesInput
  implements Prisma.TagCreateNestedManyWithoutSurveyResponsesInput
{
  @Field(() => TagWhereUniqueInput, { nullable: true })
  connect?: Prisma.TagWhereUniqueInput;

  @Field(() => TagCreateWithoutSurveyResponseInput, { nullable: true })
  create?: Prisma.TagCreateWithoutSurveyResponsesInput;

  @Field(() => TagCreateManySurveyResponseInputEnvelope, { nullable: true })
  createMany?: Prisma.TagCreateManyInput;
}

@InputType()
export class TagCreateManySurveyResponseInputEnvelope
  implements Prisma.TagCreateManyInput
{
  id?: string | undefined;
  value: string;
  @Field(() => [TagCreateManySurveyResponseInput])
  data: Prisma.TagCreateManyInput[];

  skipDuplicates?: boolean;
}

@InputType()
export class TagCreateNestedManyWithoutQuestionInput
  implements Prisma.TagCreateNestedManyWithoutSurveyResponsesInput
{
  @Field(() => [TagWhereUniqueInput])
  connect?: Prisma.Enumerable<Prisma.TagWhereUniqueInput>;
}
