import { IncidentCreateInput } from '@odst/types/waypoint';

export const TestIncidentCreateInput: IncidentCreateInput[] = [
  {
    openDate: new Date(),
    closeDate: new Date(),
    reportedDate: new Date(),
    selfReported: true,
  },
];
