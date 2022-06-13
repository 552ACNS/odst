import { Injectable } from '@nestjs/common';
import { Prisma, Question, FeedbackResponse } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async question(
    answerWhereUniqueInput: Prisma.AnswerWhereUniqueInput
  ): Promise<Question | null> {
    return this.prisma.answer
      .findUnique({ where: answerWhereUniqueInput })
      .question();
  }

  async feedbackResponse(
    answerWhereUniqueInput: Prisma.AnswerWhereUniqueInput
  ): Promise<FeedbackResponse | null> {
    return this.prisma.answer
      .findUnique({ where: answerWhereUniqueInput })
      .feedbackResponse();
  }
}
