import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseCount {
  @Field(() => Number)
  unresolved: number;

  @Field(() => Number)
  overdue: number;

  @Field(() => Number)
  resolved: number;
}
