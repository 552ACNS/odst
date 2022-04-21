import { Module } from '@nestjs/common';
import { SurveyResponseService } from './surveyResponse.service';
import { SurveyResponseResolver } from './surveyResponse.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [SurveyResponseResolver, SurveyResponseService, PrismaService],
})
export class SurveyResponseModule {}
