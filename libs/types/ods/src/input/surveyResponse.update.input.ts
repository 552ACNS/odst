import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';

@InputType()
export class SurveyResponseUpdateInput
  implements Prisma.SurveyResponseUpdateInput
{
  closedDate?: Date;
  answers?: string[];
  routeOutside?: boolean;
  resolution?: string;
}

@InputType()
export class SurveyResponseUpdateManyWithoutSurveyInput {
  //TODO stubbed
}
