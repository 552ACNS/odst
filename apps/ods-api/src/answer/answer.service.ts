import { Injectable } from '@nestjs/common';
import { Prisma, Question } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnswerService {
  F;
  constructor(private prisma: PrismaService) {}

  async question(
    answerWhereUniqueInput: Prisma.AnswerWhereUniqueInput
  ): Promise<Question | null> {
    return this.prisma.answer
      .findUnique({ where: answerWhereUniqueInput })
      .question();
  }
}
