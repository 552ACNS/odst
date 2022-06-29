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

  @Field(() => Tag)
  tags: Tag[];
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
