import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Question } from '.prisma/ods/client';
import { QuestionUpdateInput } from '@odst/types/ods';

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
       survey: {
          every: {
            id: surveyId,
          },
        },
      },
    });
  }


  findOne(id: string) {
    return `This action returns a #${id} question`;
  }

  update(id: string, updateQuestionInput: QuestionUpdateInput) {
    return `This action updates a #${id} question`;
  }

  remove(id: string) {
    return `This action removes a #${id} question`;
  }
}
