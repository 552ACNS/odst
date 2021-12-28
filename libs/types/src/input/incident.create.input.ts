import { InputType, Field } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";

@InputType()
  export class IncidentCreateInput
  
    implements Prisma.IncidentCreateInput
  {
    id?: string;
    openDate:  Date;
    closeDate: Date;
    reportedDate: Date;
    selfReported: boolean;
    
  }


