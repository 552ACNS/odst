import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Question } from '.prisma/ods/client';
import { Prisma } from '.prisma/ods/client';

@ObjectType()
@InputType('QuestionGQLInput')
export class QuestionGQL implements Question {
  
  @Field(() => String, { nullable: true })
  id: string;
  prompt: string;
}

@InputType('QuestionWhereUniqueInput')
export class QuestionWhereUniqueInput implements Prisma.QuestionWhereUniqueInput {
  id: string;
}
