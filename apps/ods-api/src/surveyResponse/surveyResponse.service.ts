import { Injectable } from '@nestjs/common';
import { SurveyResponse, Prisma } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SurveyResponseService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SurveyResponseWhereUniqueInput;
    where?: Prisma.SurveyResponseWhereUniqueInput;
    orderBy?: Prisma.SurveyResponseOrderByWithRelationInput;
  }): Promise<SurveyResponse[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.surveyResponse.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findUnique(
    surveyResponseWhereUniqueInput: Prisma.SurveyResponseWhereUniqueInput
  ): Promise<SurveyResponse | null> {
    return this.prisma.surveyResponse.findUnique({
      where: surveyResponseWhereUniqueInput,
    });
  }

  async create(
    data: Prisma.SurveyResponseCreateInput
  ): Promise<SurveyResponse> {
    return this.prisma.surveyResponse.create({
      data,
    });
  }

  async update(
    surveyResponseWhereUniqueInput: Prisma.SurveyResponseWhereUniqueInput,
    surveyResponseUpdateInput: Prisma.SurveyResponseUpdateInput
  ): Promise<SurveyResponse> {
    return this.prisma.surveyResponse.update({
      where: surveyResponseWhereUniqueInput,
      data: surveyResponseUpdateInput,
    });
  }

  async delete(
    orgWhereUniqueInput: Prisma.SurveyResponseWhereUniqueInput
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.prisma.surveyResponse.delete({
        where: orgWhereUniqueInput,
      });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
