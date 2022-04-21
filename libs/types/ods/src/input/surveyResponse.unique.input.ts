import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';

@InputType()
export class SurveyResponseWhereUniqueInput
  implements Prisma.SurveyResponseWhereUniqueInput
{
  id?: string;
}
