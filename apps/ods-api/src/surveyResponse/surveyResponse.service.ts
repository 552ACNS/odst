import { Injectable, Logger } from '@nestjs/common';
import {
  SurveyResponse,
  Prisma,
  Survey,
  Answer,
  Role,
  User,
  Comment,
} from '.prisma/ods/client';
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

  async countResponses(user: User): Promise<ResponseCount> {
    const whereBasedOnUserOrgs = await this.getWhereBasedOnUserOrgs(user);

    // TODO: Optimize at a later date, so we don't go back and forth to the server

    const [unresolved, overdue, resolved] = await this.prisma.$transaction([
      this.prisma.surveyResponse.count({
        where: {
          resolution: null,
          ...whereBasedOnUserOrgs,
        },
      }),

      this.prisma.surveyResponse.count({
        where: {
          resolution: { not: null },
          ...whereBasedOnUserOrgs,
        },
      }),

      this.prisma.surveyResponse.count({
        where: {
          openedDate: {
            lt: new Date(Date.now() - 2592000000),
          },
          ...whereBasedOnUserOrgs,
        },
      }),
    ]);

    return { unresolved, overdue, resolved };
  }

  determineStatus(resolved: string): Prisma.SurveyResponseWhereInput {
    let whereIssues: Prisma.SurveyResponseWhereInput = {};
    switch (resolved) {
      case 'overdue':
        whereIssues = {
          openedDate: {
            lt: new Date(Date.now() - 2592000000),
          },
          resolution: null,
        };
        break;
      case 'unresolved':
        whereIssues = {
          resolution: null,
        };
        break;
      case 'resolved':
        whereIssues = {
          resolution: { not: null },
        };
        break;
    }
    return whereIssues;
  }

  async getIssuesByStatus(resolved: string, user: User): Promise<string[]> {
    return this.prisma.surveyResponse
      .findMany({
        where: {
          ...this.determineStatus(resolved),
          ...(await this.getWhereBasedOnUserOrgs(user)),
        },
        select: {
          id: true,
        },
        orderBy: {
          openedDate: 'asc',
        },
      })
      .then((responses) => responses.map((response) => response.id));
    //TODO Not ideal. frontend is doing some wonky delayed loading. Should just return all issues, or paginate them.
    //Using the findMany above so as to not repeat stuff in the servicer
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

  async comments(
    surveyResponseWhereUniqueInput: Prisma.SurveyResponseWhereUniqueInput
  ): Promise<Comment[]> {
    return this.prisma.surveyResponse
      .findUnique({ where: surveyResponseWhereUniqueInput })
      .comments();
  }

  //TODO refactor for complexity
  private async getUsersOrgs(user: User): Promise<string[]> {
    const whereUser = {
      users: {
        some: {
          id: user.id,
        },
      },
    };

    switch (user.role) {
      case Role.ADMIN:
        // no need to do a db query for admins
        return [];
      case Role.DEI:
      case Role.EO:
        //get all orgs where user is either a member of it, a member of the parent or a member of the grand parent
        return this.prisma.org
          .findMany({
            select: { name: true },
            where: {
              OR: [
                whereUser,
                {
                  parent: {
                    OR: [
                      whereUser,
                      {
                        parent: whereUser,
                      },
                    ],
                  },
                },
              ],
            },
          })
          .then((orgs) => orgs.map((org) => org.name));
      case Role.CC:
        return this.prisma.org
          .findMany({ where: whereUser, select: { name: true } })
          .then((orgs) => orgs.map((org) => org.name));
    }
  }

  //TODO refactor for complexity
  private async getWhereBasedOnUserOrgs(
    user: User
  ): Promise<Prisma.SurveyResponseWhereInput> {
    Logger.log('getOrgWhereBasedOnUser');
    const orgs = await this.getUsersOrgs(user);

    const whereAnswer = {
      answers: {
        some: {
          question: {
            prompt: {
              //TODO hardcoded value
              equals: 'What squadron did the event occur in?',
            },
          },
          value: {
            in: orgs,
          },
        },
      },
    };

    switch (user.role) {
      case Role.ADMIN:
        //admin sees everything
        return {};
      case Role.DEI:
      case Role.EO:
        return {
          ...whereAnswer,
          survey: {
            orgs: {
              some: {
                name: { in: orgs },
              },
            },
          },
        };
      case Role.CC:
        return {
          //no surveyResponses that are routed outside
          routeOutside: false,
          ...whereAnswer,
          survey: {
            orgs: {
              some: { name: { in: orgs } },
            },
          },
        };
    }
    // This is here so if we define a new role,
    // they see nothing until we define what they should see
    return { id: { in: [] } };
  }
}
