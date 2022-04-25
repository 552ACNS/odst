import { Injectable } from '@nestjs/common';
import { SurveyResponse, Prisma, Survey, Answer } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SurveyResponseService {
  constructor(private prisma: PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SurveyResponseWhereUniqueInput;
    where?: Prisma.SurveyResponseWhereInput;
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
    surveyResponseWhereUniqueInput: Prisma.SurveyResponseWhereUniqueInput
  ): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.prisma.surveyResponse.delete({
        where: surveyResponseWhereUniqueInput,
      });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async countResponses(
    surveyResponseWhereInput: Prisma.SurveyResponseWhereInput
  ): Promise<number[]> {
    // TODO: Optimize at a later date, so we don't go back and forth to the server
    // Will need a custom data loader to do this. Or use _count subfield inside a query that prisma already batches

    const unresolvedCount = this.prisma.surveyResponse.count({
      where: {
        resolution: null,
        ...surveyResponseWhereInput,
      },
    });

    const resolvedCount = this.prisma.surveyResponse.count({
      where: {
        resolution: { not: null },
        ...surveyResponseWhereInput,
      },
    });

    const overdueCount = this.prisma.surveyResponse.count({
      where: {
        openedDate: {
          lt: new Date(Date.now() - 2592000000),
        },
        ...surveyResponseWhereInput,
      },
    });

    return Promise.all([unresolvedCount, overdueCount, resolvedCount]);
  }

  async survey(
    AnswerWhereUniqueInput: Prisma.AnswerWhereUniqueInput
  ): Promise<Survey | null> {
    return this.prisma.surveyResponse
      .findUnique({ where: AnswerWhereUniqueInput })
      .survey();
  }

  async answers(
    surveyResponseWhereUniqueInput: Prisma.SurveyResponseWhereUniqueInput
  ): Promise<Answer[]> {
    return this.prisma.surveyResponse
      .findUnique({ where: surveyResponseWhereUniqueInput })
      .answers();
  }
}
