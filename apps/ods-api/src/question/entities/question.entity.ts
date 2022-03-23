import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Question {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
