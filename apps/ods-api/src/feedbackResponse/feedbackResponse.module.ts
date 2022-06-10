import { Module } from '@nestjs/common';
import { FeedbackResponseService } from './feedbackResponse.service';
import { FeedbackResponseResolver } from './feedbackResponse.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [FeedbackResponseResolver, FeedbackResponseService, PrismaService],
})
export class FeedbackResponseModule {}
