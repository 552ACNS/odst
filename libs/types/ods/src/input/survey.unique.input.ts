import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';

@InputType()
export class SurveyWhereUniqueInput implements Prisma.SurveyWhereUniqueInput {
  id?: string;
  questionsHash?: string;
}
