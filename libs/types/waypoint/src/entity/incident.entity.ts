import { ObjectType } from '@nestjs/graphql';
import { Incident } from '.prisma/waypoint/client';

@ObjectType()
export class IncidentGQL implements Incident {
  id: string;
  openDate: Date;
  closeDate: Date;
  reportedDate: Date;
  selfReported: boolean;
}
