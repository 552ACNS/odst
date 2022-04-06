import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionService } from '../question/question.service';
import { SurveyResponseService } from '../surveyResponse/surveyResponse.service';

@Module({
  providers: [
    AnswerResolver,
    AnswerService,
    QuestionService,
    SurveyResponseService,
    PrismaService,
  ],
})
export class AnswerModule {}
