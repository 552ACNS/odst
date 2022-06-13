import { Injectable } from '@nestjs/common';
import { Question, Prisma, Feedback, Answer } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

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

  async update(
    questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput,
    questionUpdateInput: Prisma.QuestionUpdateInput
  ): Promise<Question> {
    return this.prisma.question.update({
      where: questionWhereUniqueInput,
      data: questionUpdateInput,
    });
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
