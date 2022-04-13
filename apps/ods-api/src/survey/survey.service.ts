import { Injectable } from '@nestjs/common';
import {
  Survey,
  Prisma,
  SurveyResponse,
  Question,
  Org,
} from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SurveyService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SurveyWhereUniqueInput;
    where?: Prisma.SurveyWhereInput;
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

  async create(data: Prisma.SurveyCreateInput): Promise<Survey> {
    return this.prisma.survey.create({
      data,
    });
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

  async orgs(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<Org[]> {
    return this.prisma.survey
      .findUnique({ where: surveyWhereUniqueInput })
      .orgs();
  }

  async questions(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<Question[]> {
    return this.prisma.survey
      .findUnique({ where: surveyWhereUniqueInput })
      .questions();
  }

  async surveyResponses(
    surveyWhereUniqueInput: Prisma.SurveyWhereUniqueInput
  ): Promise<SurveyResponse[]> {
    return this.prisma.survey
      .findUnique({ where: surveyWhereUniqueInput })
      .surveyResponses();
  }
}
