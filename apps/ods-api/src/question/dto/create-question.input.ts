import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
