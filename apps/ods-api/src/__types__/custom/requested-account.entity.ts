import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountCount {
  @Field(() => Number)
  total: number;
}
