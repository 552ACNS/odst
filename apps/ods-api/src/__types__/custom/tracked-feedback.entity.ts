import { Field, ObjectType } from '@nestjs/graphql';
import { Tag } from '@odst/types/ods';

@ObjectType()
export class TrackedFeedback {
  @Field(() => Date)
  openedDate: Date;

  @Field(() => Date)
  closedDate: Date | null;

  @Field(() => Boolean)
  resolved: boolean;

  @Field(() => [String])
  tags: string[];

  @Field(() => String)
  grade: string | null;

  @Field(() => String)
  firstName: string | null;

  @Field(() => String)
  lastName: string | null;
}

// @ObjectType()
// class ReviewedBy {
//   @Field(() => String)
//   grade: string | null;

//   @Field(() => String)
//   firstName: string | null;

//   @Field(() => String)
//   lastName: string | null;
// }
