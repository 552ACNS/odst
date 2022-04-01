import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Survey } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
import { SurveyGQL } from '@odst/types/ods';
import { Md5 as md5 } from 'ts-md5/dist/md5';

@Injectable()
export class SurveyService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SurveyWhereUniqueInput;
    where?: Prisma.SurveyWhereUniqueInput;
    orderBy?: Prisma.SurveyOrderByWithRelationInput;
  }): Promise<Survey[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.survey.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findUnique(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<Survey | null> {
    return this.prisma.survey.findUnique({
      where: surveyWhereUniqueInput,
    });
  }

  async createWithQuestions(questionPrompts: string[]) {
    if (questionPrompts.length <= 0) {
      throw new BadRequestException('No question prompts provided');
    }
    const questionIds: string[] = [];

    //Could not resolve questions and only hash by string, since it's unique also
    for (const prompt of questionPrompts) {
      //don't use forEach,etc. awaits won't act as expected
      questionIds.push(
        (
          await this.prisma.question.upsert({
            where: { prompt },
            create: { prompt },
            update: {},
          })
        ).id
      );
    }

    const questionsHash = await this.getQuestionsHash(questionIds);

    return this.prisma.survey.upsert({
      where: { questionsHash },
      create: {
        questionsHash,
        questions: { connect: questionIds.map((id) => ({ id })) },
      },
      update: {},
    });
  }

  async create(data: Prisma.SurveyCreateInput): Promise<SurveyGQL> {
    const survey = await this.prisma.survey.create({
      data,
    });

    await this.updateQuestionsHash({ id: survey.id });

    return survey;
  }

  async update(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput,
    surveyUpdateInput: Prisma.SurveyUpdateInput
  ): Promise<Survey> {
    const survey = await this.prisma.survey.update({
      where: surveyWhereUniqueInput,
      data: surveyUpdateInput,
    });

    await this.updateQuestionsHash(surveyWhereUniqueInput);

    return survey;
  }

  async delete(
    orgWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.prisma.survey.delete({
        where: orgWhereUniqueInput,
      });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  //TODO optimize database calls. each survey create/update requires 3 database calls.
  //TODO only call if questions is being updated
  private async updateQuestionsHash(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<void> {
    const questions = await this.prisma.question.findMany({
      where: { surveys: { every: surveyWhereUniqueInput } },
    });

    const questionStr = questions
      .map((question) => question.id)
      .sort()
      .join();

    const questionsHash =
      questionStr.length > 0 ? md5.hashStr(questionStr) : null;

    await this.prisma.survey.update({
      where: surveyWhereUniqueInput,
      data: { questionsHash },
    });
  }

  private async getQuestionsHash(questionIds: string[]): Promise<string> {
    if (questionIds.length <= 0) {
      throw new BadRequestException('No question prompts provided');
    }
    const questionStr = questionIds.sort().join();

    return md5.hashStr(questionStr);
  }

  //TODO tests for new methods
}

