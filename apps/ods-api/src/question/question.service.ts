import { Injectable } from '@nestjs/common';
import { Question, Prisma } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {} //, private survey: SurveyService

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

  //Find all the questions that are in a survey
  async findQuestionsInSurvey(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<Question[]> {
    return await this.prisma.question.findMany({
      where: {
        surveys: {
          every: surveyWhereUniqueInput,
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
  // TODO:Delete if ends up never getting used.
  async upsert(
    questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput,
    questionUpdateInput: Prisma.QuestionUpdateInput,
    questionCreateInput: Prisma.QuestionCreateInput
  ): Promise<Question> {
    return this.prisma.question.upsert({
      where: questionWhereUniqueInput,
      update: questionUpdateInput,
      create: questionCreateInput,
    });
  }

  // async getPromptsFromIds(prompts: string[]) {
  //   //Gets an array of IDs based off an array of prompts, then 
  //   const IDs : string[] = (await this.prisma.question.findMany({
  //     select: {
  //       id: true,
  //     },
  //     where: {
  //       prompt: { in: prompts },
  //     },
  //   })).map(x => x.id);

  //   const hash = getArrayHash(IDs)
    
    
  //   this.survey.findUnique({
  //     questionsHash: hash,
  //   })
  // }
}


