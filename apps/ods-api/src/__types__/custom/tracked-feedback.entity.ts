import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TrackedFeedback {
  @Field(() => Date)
  openedDate: Date;

  @Field(() => Date)
  closedDate: Date | null;

  @Field(() => Boolean)
  resolved: boolean;

  @Field(() => String)
  grade: string | null;

  @Field(() => String)
  firstName: string | null;

  @Field(() => String)
  lastName: string | null;
}
