import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Question } from '.prisma/ods/client';
import { UpdateQuestionInput } from './dto/update-question.input';

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


  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionInput: UpdateQuestionInput) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
