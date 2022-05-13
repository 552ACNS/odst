import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { CommentWhereUniqueInput } from './comment.unique.input';
import { UserCreateNestedOneWithoutCommentsInput } from './user.create.input';
import { SurveyResponseCreateNestedOneWithoutCommentsInput } from './surveyResponse.create.input';

@InputType()
export class CommentCreateInput implements Prisma.CommentCreateInput {
  id?: string | undefined;
  value: string;
  date?: Date;

  @Field(() => UserCreateNestedOneWithoutCommentsInput)
  author: Prisma.UserCreateNestedOneWithoutCommentsInput;

  @Field(() => SurveyResponseCreateNestedOneWithoutCommentsInput)
  surveyResponse: Prisma.SurveyResponseCreateNestedOneWithoutCommentsInput;
}

@InputType()
export class CommentCreateWithoutSurveyResponseInput
  implements Prisma.CommentCreateWithoutSurveyResponseInput
{
  value: string;

  @Field(() => UserCreateNestedOneWithoutCommentsInput)
  author: Prisma.UserCreateNestedOneWithoutCommentsInput;
}

@InputType()
export class CommentCreateManySurveyResponseInput
  implements Prisma.CommentCreateManySurveyResponseInput
{
  value: string;
  authorId: string;
}

@InputType()
export class CommentCreateNestedManyWithoutSurveyResponseInput
  implements Prisma.CommentCreateNestedManyWithoutSurveyResponseInput
{
  @Field(() => CommentCreateWithoutSurveyResponseInput, { nullable: true })
  create?: Prisma.CommentCreateWithoutSurveyResponseInput;
}

@InputType()
export class CommentCreateManySurveyResponseInputEnvelope
  implements Prisma.CommentCreateManySurveyResponseInputEnvelope
{
  data: Prisma.Enumerable<Prisma.CommentCreateManySurveyResponseInput>;
  skipDuplicates?: boolean | undefined;
}

@InputType()
export class CommentCreateNestedManyWithoutAuthorInput
  implements Prisma.CommentCreateNestedManyWithoutAuthorInput
{
  @Field(() => CommentWhereUniqueInput, { nullable: true })
  connect?: Prisma.CommentWhereUniqueInput;

  @Field(() => CommentCreateNestedManyWithoutAuthorInput, { nullable: true })
  create?: Prisma.CommentCreateWithoutAuthorInput;

  @Field(() => CommentCreateNestedManyWithoutAuthorInput, { nullable: true })
  createMany?: Prisma.CommentCreateManyAuthorInputEnvelope;
}
