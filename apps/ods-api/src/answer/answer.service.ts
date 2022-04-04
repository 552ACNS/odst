import { Injectable } from '@nestjs/common';
import { Answer, Prisma } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AnswerWhereUniqueInput;
    where?: Prisma.AnswerWhereInput;
    orderBy?: Prisma.AnswerOrderByWithRelationInput;
  }): Promise<Answer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.answer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findUnique(
    answerWhereUniqueInput: Prisma.AnswerWhereUniqueInput
  ): Promise<Answer | null> {
    return this.prisma.answer.findUnique({
      where: answerWhereUniqueInput,
    });
  }

  async create(data: Prisma.AnswerCreateInput): Promise<Answer> {
    return this.prisma.answer.create({
      data,
    });
  }

  async update(
    answerWhereUniqueInput: Prisma.AnswerWhereUniqueInput,
    answerUpdateInput: Prisma.AnswerUpdateInput
  ): Promise<Answer> {
    return this.prisma.answer.update({
      where: answerWhereUniqueInput,
      data: answerUpdateInput,
    });
  }

  async delete(
    answerWhereUniqueInput: Prisma.AnswerWhereUniqueInput
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.prisma.answer.delete({
        where: answerWhereUniqueInput,
      });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
