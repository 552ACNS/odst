import { ObjectType, InputType } from '@nestjs/graphql';
import { Question } from '.prisma/ods/client';

@ObjectType()
@InputType('QuestionGQLInput')
export class QuestionGQL implements Question {
  id: string;
  prompt: string;
}
