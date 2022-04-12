import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [SurveyResolver, SurveyService, PrismaService],
})
export class SurveyModule {}
