import { Module } from '@nestjs/common';
import { SurveyResponseService } from './surveyresponse.service';
import { SurveyResponseResolver } from './surveyresponse.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [SurveyResponseResolver, SurveyResponseService, PrismaService],
})
export class SurveyResponseModule {}
