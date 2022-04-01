import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '.prisma/ods/client';
import { SurveyCreateInput } from './survey.create.input';
import { QuestionUpdateManyWithoutSurveysInput } from './question.unique.input';

@InputType()
export class SurveyUpdateInput
  // extends SurveyCreateInput
  implements Prisma.SurveyUpdateInput {

    @Field(() => QuestionUpdateManyWithoutSurveysInput)
    questions?: Prisma.QuestionUpdateManyWithoutSurveysInput;
  }
