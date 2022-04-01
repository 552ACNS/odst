import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { SurveyResponse, Prisma } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
import { SurveyResponseGQL } from '@odst/types/ods';

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

  // Get the string IDs of all the issues that are unresolved that the commander
  // has responsibility over
  async getIssuesByStatus(resolved: boolean): Promise<string[]> {
    const responsesIDs = await this.prisma.surveyResponse
      .findMany({
        where: {
          resolution: resolved ? { not: null } : null,
        },
        select: {
          id: true,
        },
        orderBy: {
          openedDate: 'asc',
        },
      })
      .then((responses) => responses.map((response) => response.id));

    // TODO Depends on user to be logged in, renable once we have a user
    // const responsesIDs = await this.prisma.surveyResponse
    //   .findMany({
    //     where: {
    //       survey: {
    //         orgs: {
    //           every: {
    //             commanders: {
    //               every: {
    //                 id: userId,
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //     select: {
    //       id: true,
    //     },
    //   })
    //   .then((responses) => responses.map((response) => response.id));

    return responsesIDs;
  }

  // Get the string IDs of all the issues that are unresolved that the commander
  async getSurveyResponseData(
    surveyResponseWhereUniqueInput: Prisma.SurveyResponseWhereUniqueInput
  ) {
    return await this.prisma.surveyResponse.findUnique({
      where: {
        id: surveyResponseWhereUniqueInput.id,
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.SurveyResponseCreateInput) {
    return await this.prisma.surveyResponse.create({
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
