import { Injectable } from '@nestjs/common';
import { Survey, Prisma } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
import { SurveyGQL, SurveyWhereUniqueInput } from '@odst/types/ods';

@Injectable()
export class SurveyService {
  getSubSurveys(surveyInput: SurveyWhereUniqueInput) {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) {}

  async findUnique(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<Survey | null> {
    return this.prisma.survey.findUnique({
      where: surveyWhereUniqueInput,
    });
  }

  async surveys(params: {
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
  async create(data: Prisma.SurveyCreateInput): Promise<SurveyGQL> {
    return this.prisma.survey.create({
      data,
    });
  }

  async findMany(): Promise<SurveyGQL[]> {
    return this.prisma.survey.findMany();
  }

  async update(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput,
    surveyUpdateInput: Prisma.SurveyUpdateInput
  ): Promise<Survey> {
    return this.prisma.survey.update({
      where: surveyWhereUniqueInput,
      data: surveyUpdateInput,
    });
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
}
