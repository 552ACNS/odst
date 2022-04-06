import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { AnswerService } from '../answer/answer.service';
import { SurveyService } from '../survey/survey.service';

@Module({
  providers: [
    QuestionResolver,
    QuestionService,
    AnswerService,
    SurveyService,
    PrismaService,
  ],
})
export class QuestionModule {}
