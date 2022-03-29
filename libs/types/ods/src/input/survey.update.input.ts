import { InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { SurveyCreateInput } from './survey.create.input';

@InputType()
export class SurveyUpdateInput
  extends SurveyCreateInput
  implements Prisma.SurveyUpdateInput {}
