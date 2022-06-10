import { Injectable } from '@nestjs/common';
import { Question, Prisma, Feedback, Answer } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.QuestionWhereUniqueInput;
    where?: Prisma.QuestionWhereInput;
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

  //Find all the questions that are in a feedback
  async findQuestionsInFeedback(
    feedbackWhereUniqueInput: Prisma.FeedbackWhereUniqueInput
  ): Promise<Question[]> {
    return this.prisma.question.findMany({
      where: {
        feedbacks: {
          every: feedbackWhereUniqueInput,
        },
      },
    });
  }

  async findUnique(
    questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput
  ): Promise<Question | null> {
    return this.prisma.question.findUnique({
      where: questionWhereUniqueInput,
    });
  }

  async create(data: Prisma.QuestionCreateInput): Promise<Question> {
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

  async answers(
    questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput
  ): Promise<Answer[]> {
    return this.prisma.question
      .findUnique({ where: questionWhereUniqueInput })
      .answers();
  }

  async feedbacks(
    questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput
  ): Promise<Feedback[]> {
    return this.prisma.question
      .findUnique({ where: questionWhereUniqueInput })
      .feedbacks();
  }
}
