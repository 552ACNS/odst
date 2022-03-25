import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';

@Module({
  providers: [QuestionResolver, QuestionService],
})
export class QuestionModule {}
