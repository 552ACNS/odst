import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/waypoint/client';

@InputType()
export class IncidentUpdateInput implements Prisma.IncidentUpdateInput {
  openDate?: Date;
  closeDate?: Date;
  reportedDate?: Date;
  selfReported?: boolean;
}
