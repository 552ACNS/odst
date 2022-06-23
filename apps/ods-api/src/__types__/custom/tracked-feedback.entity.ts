import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TrackedFeedback {
  @Field(() => Boolean)
  resolved: boolean;

  @Field(() => Date)
  openDate: Date;

  @Field(() => Date)
  closedDate: Date | null;
}
