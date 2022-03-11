import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class IncidentCreateInput implements Prisma.IncidentCreateInput {
  @Field(() => Date)
  openDate: Date;

  @Field(() => Date)
  closeDate: Date;

  @Field(() => Date)
  reportedDate: Date;

  @Field(() => Boolean)
  selfReported: boolean;
}
