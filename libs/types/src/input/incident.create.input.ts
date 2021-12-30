import { InputType, Field } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";

@InputType()
  export class IncidentCreateInput
  
    implements Prisma.IncidentCreateInput
  {
    openDate:  Date;
    closeDate: Date;
    reportedDate: Date;
    selfReported: boolean;
    
  }


