import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { CommentWhereUniqueInput } from './comment.unique.input';
import { UserGQL } from '../entity/user.entity';

@InputType()
export class CommentCreateInput implements Prisma.CommentCreateInput {
  id?: string | undefined;
  value: string;
  date?: Date;

  @Field(() => UserGQL)
  author: Prisma.UserCreateNestedOneWithoutCommentsInput;
  SurveyResponse?:
    | Prisma.SurveyResponseCreateNestedOneWithoutCommentsInput
    | undefined;
}

@InputType()
export class CommentCreateWithoutSurveyResponseInput
  implements Prisma.CommentCreateWithoutSurveyResponseInput
{
  id?: string | undefined;
  value: string;
  date?: Date;

  @Field(() => UserGQL)
  author: Prisma.UserCreateNestedOneWithoutCommentsInput;
}

@InputType()
export class CommentCreateManySurveyResponseInput
  implements Prisma.CommentCreateManySurveyResponseInput
{
  id?: string | undefined;
  value: string;
  date?: Date;
  authorId: string;
}

@InputType()
export class CommentCreateNestedManyWithoutSurveyResponseInput
  implements Prisma.CommentCreateNestedManyWithoutSurveyResponseInput
{
  @Field(() => CommentWhereUniqueInput, { nullable: true })
  connect?: Prisma.CommentWhereUniqueInput;

  @Field(() => CommentCreateWithoutSurveyResponseInput, { nullable: true })
  create?: Prisma.CommentCreateWithoutSurveyResponseInput;

  @Field(() => CommentCreateNestedManyWithoutSurveyResponseInput, {
    nullable: true,
  })
  createMany?: Prisma.CommentCreateManySurveyResponseInputEnvelope;
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
