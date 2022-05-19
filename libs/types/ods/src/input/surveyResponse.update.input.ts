import { InputType, Field } from '@nestjs/graphql';
import { Prisma, Tags } from '.prisma/ods/client';

@InputType()
export class SurveyResponseUpdateInput
  implements Prisma.SurveyResponseUpdateInput
{
  closedDate?: Date;

  // If this is included in update, make sure not anyone can change it,
  // so a CC can't come in and route something to themself that they shouldn't be seen
  //TODO Org Guard
  routeOutside?: boolean;
  resolution?: string;

  @Field(() => Tags)
  tags: Tags;
}
