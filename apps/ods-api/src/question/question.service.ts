import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Question } from '.prisma/ods/client';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.QuestionCreateInput): Promise<Question> {
    return await this.prisma.question.create({
      data,
    });
  }

  //Find all the questions that are in a survey
  async findQuestionsInSurvey(surveyId: string): Promise<Question[]> {
    return await this.prisma.question.findMany({
      where: {
        surveys: {
          every: {
            id: surveyId,
          },
        },
      },
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} question`;
  // }

  async update(
    questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput,
    questionUpdateInput: Prisma.QuestionUpdateInput
  ): Promise<Question> {
    return this.prisma.question.update({
      where: questionWhereUniqueInput,
      data: questionUpdateInput,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} question`;
  // }
}
