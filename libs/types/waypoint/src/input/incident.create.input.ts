import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/waypoint/client';

@InputType()
export class IncidentCreateInput implements Prisma.IncidentCreateInput {
  openDate: Date;
  closeDate: Date;
  reportedDate: Date;
  selfReported: boolean;
}
