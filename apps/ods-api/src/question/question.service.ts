import { Injectable } from '@nestjs/common';
import { Question, Prisma } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionCreateInput, QuestionGQL } from '@odst/types/ods';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.QuestionWhereUniqueInput;
    where?: Prisma.QuestionWhereUniqueInput;
    orderBy?: Prisma.QuestionOrderByWithRelationInput;
  }): Promise<Question[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.question.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  
  async findUnique(
    questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput
  ): Promise<Question | null> {
    return this.prisma.question.findUnique({
      where: questionWhereUniqueInput,
    });
  }

  async create(data: Prisma.QuestionCreateInput): Promise<QuestionGQL> {
    return this.prisma.question.create({
      data,
    });
  }

  async update(
    questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput,
    questionUpdateInput: Prisma.QuestionUpdateInput
  ): Promise<Question> {
    return this.prisma.question.update({
      where: questionWhereUniqueInput,
      data: questionUpdateInput,
    });
  }

  async delete(
    questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.prisma.question.delete({
        where: questionWhereUniqueInput,
      });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}