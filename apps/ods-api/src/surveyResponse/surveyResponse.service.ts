import { Injectable, Logger } from '@nestjs/common';
import { SurveyResponse, Prisma, Survey, Answer } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
// eslint-disable-next-line no-restricted-imports
import { ResponseCount } from '@odst/types/ods';
import { Cron, CronExpression } from '@nestjs/schedule';

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
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async getSurveyResponseData(
    surveyResponseWhereUniqueInput: Prisma.SurveyResponseWhereUniqueInput
  ) {
    return this.prisma.surveyResponse.findUnique({
      where: surveyResponseWhereUniqueInput,
      include: {
        answers: {
          include: {
            question: true,
          },
        },
      },
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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'Delete surveyResponses older than a year',
  })
  private async deleteSurveyResponsesOlderThanAYear(): Promise<void> {
    Logger.log(
      'Deleting survey responses older than a year',
      'SurveyResponseService'
    );
    // TODO: Redo with try catch
    //Will silently fail if delete isn't cascaded properly
    const [deleteAnswers, deleteSurveyResponses] =
      await this.prisma.$transaction([
        this.prisma.answer.deleteMany({
          where: {
            surveyResponse: {
              closedDate: { lt: new Date(Date.now() - 31536000000) },
            },
          },
        }),
        this.prisma.surveyResponse.deleteMany({
          where: { closedDate: { lt: new Date(Date.now() - 31536000000) } },
        }),
      ]);
    if (deleteSurveyResponses.count > 0) {
      Logger.log(
        `Deleted ${deleteSurveyResponses.count} survey responses`,
        'SurveyResponseService'
      );
    }
  }

  // TODO: Optimize at a later date, so we don't go back and forth to the server

  async countResponses(): Promise<ResponseCount> {
    //TODO: Promise a number array and remove awaits

    const unresolvedCount = await this.prisma.surveyResponse.count({
      where: {
        resolution: null,
      },
    });

    const resolvedCount = await this.prisma.surveyResponse.count({
      where: {
        resolution: { not: null },
      },
    });

    const overdueCount = await this.prisma.surveyResponse.count({
      where: {
        openedDate: {
          lt: new Date(Date.now() - 2592000000),
        },
      },
    });

    return {
      unresolved: unresolvedCount,
      overdue: overdueCount,
      resolved: resolvedCount,
    };
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
