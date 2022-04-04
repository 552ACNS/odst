import { Module } from '@nestjs/common';
import { SurveyResponseService } from './surveyResponse.service';
import { SurveyResponseResolver } from './surveyResponse.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { AnswerService } from '../answer/answer.service';
import { SurveyService } from '../survey/survey.service';

@Module({
  providers: [SurveyResponseResolver, SurveyResponseService, AnswerService, SurveyService, PrismaService],
})
export class SurveyResponseModule {}
