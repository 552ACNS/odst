import { Field, ObjectType } from '@nestjs/graphql';
import { Incident } from '@prisma/client';

@ObjectType()
export class IncidentGQL implements Incident {
  @Field(() => String, { nullable: true })
  id: string;
  openDate: Date;
  closeDate: Date;
  reportedDate: Date;
  selfReported: boolean;
}
