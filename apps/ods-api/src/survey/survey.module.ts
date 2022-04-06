import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionService } from '../question/question.service';
import { SurveyResponseService } from '../surveyResponse/surveyResponse.service';
import { OrgService } from '../org/org.service';

@Module({
  providers: [
    SurveyResolver,
    SurveyService,
    OrgService,
    QuestionService,
    SurveyResponseService,
    PrismaService,
  ],
})
export class SurveyModule {}
