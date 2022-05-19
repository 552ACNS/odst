import { Injectable, Logger } from '@nestjs/common';
import {
  SurveyResponse,
  Prisma,
  Survey,
  Answer,
  Role,
  User,
} from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
// eslint-disable-next-line no-restricted-imports
import { ResponseCount } from '../__types__/';
import { Cron, CronExpression } from '@nestjs/schedule';
import { cloneDeep } from '@apollo/client/utilities';

@Injectable()
export class SurveyResponseService {
  constructor(private prisma: PrismaService) {}

  /**
   * Returns Survey Responses based on criteria specified by API
   * @param user Current user, obtained from resolver
   * @param surveyResponseFindManyArgs Arguments for the findMany query, obtained from resolver
   * @returns A list of survey responses based on where clause
   */
  async findMany(
    user: User,
    surveyResponseFindManyArgs: Prisma.SurveyResponseFindManyArgs
  ): Promise<SurveyResponse[]> {
    // const usersArgs = cloneDeep(surveyResponseFindManyArgs.where);

    // Logger.log(usersArgs);

    // const blah : Prisma.SurveyResponseWhereInput = {
    //   // whatever the previous where clause was, add the user's orgs to it
    //   AND: {
    //     ...usersArgs,
    //     // Get the original where surveyresponse count args
    //     // Find me the surveys where the
    //     answers: {
    //       // answers have some
    //       some: {
    //         AND: {
    //           // question
    //           question: {
    //             // where the prompt is
    //             prompt: {
    //               equals: 'What squadron did the event occur in?',
    //             },
    //           },
    //           // and that value
    //           value: {
    //             // is contained in the user's orgs
    //             in: await this.getUsersOrgs(user),
    //           },
    //         },
    //       },
    //     },
    //   },
    // };

    // Logger.log(blah);

    return this.prisma.surveyResponse.findMany(surveyResponseFindManyArgs);
  }

  /**
   * Returns a number of responses for a based on criteria specified by API
   * @param user Current user, obtained from resolver
   * @param surveyResponseCountArgs Arguments for the count query, also obtained from resolver
   * @returns A count of survey responses based on the user's orgs
   */
  async count(
    user: User,
    surveyResponseCountArgs: Prisma.SurveyResponseCountArgs
  ): Promise<number> {
    // Please Fix
    // this.prisma.surveyResponse.count

    // modify the survey response count args to include the user's orgs
    surveyResponseCountArgs.where = {
      // whatever the previous where clause was, add the user's orgs to it
      AND: {
        // Get the original where surveyresponse count args
        ...surveyResponseCountArgs.where,
        // Find me the surveys where the
        answers: {
          // answers have some
          some: {
            AND: {
              // question
              question: {
                // where the prompt is
                prompt: {
                  equals: 'What squadron did the event occur in?',
                },
              },
              // and that value
              value: {
                // is contained in the user's orgs
                in: await this.getUsersOrgs(user),
              },
            },
          },
        },
      },
    };

    return this.prisma.surveyResponse.count(surveyResponseCountArgs);
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

  // TODO: DELETE THIS ONCE FRONTEND IS RECONFIGURED
  async countResponses(user: User): Promise<ResponseCount> {
    const whereBasedOnUserOrgs = await this.getWhere(user);

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
          ...(await this.getWhere(user)),
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

  //TODO refactor for complexity
  // eslint-disable-next-line complexity
  /**
   *
   * @param user Current user
   * @returns An array of Org Names ['552 ACNS', '552 ACW', '752 OSS'] etc.
   */
  private async getUsersOrgs(user: User): Promise<string[]> {
    // represents the user's identity
    const whereUser: Prisma.OrgWhereInput = {
      users: {
        some: {
          id: user.id,
        },
      },
    };

    switch (user.role) {
      case Role.ADMIN: {
        // Admins see all orgs
        return this.prisma.org
          .findMany({
            select: {
              name: true,
            },
          })
          .then((orgs) => orgs.map((org) => org.name));
      }
      // DEI and CC basically have the same logic on who sees what based on their org membership
      case Role.DEI:
      case Role.CC: {
        // get all orgs where user is either a member of it,
        // a member of the parent
        // or a member of the grandparent
        // Refactor to allow for (N-levels of orgs)
        return this.prisma.org
          .findMany({
            select: {
              name: true,
            },
            // find me the orgs where
            where: {
              OR: [
                // where the user is a member of it
                whereUser,
                // where the user is a member of the parent
                {
                  parent: whereUser,
                },
                // where the user is a member of the grand parent
                {
                  parent: {
                    parent: whereUser,
                  },
                },
              ],
            },
            // I only want the distinct results
            distinct: 'name',
          })
          .then((orgs) => orgs.map((org) => org.name));
      }
      default: {
        // if we for some reason assign to a role that we don't define here
        // they don't have access to anything
        return [];
      }
    }
  }

  //TODO refactor for complexity
  // TODO: DELETE THIS ONCE FRONTEND IS RECONFIGURED
  // eslint-disable-next-line complexity
  private async getWhere(user: User): Promise<Prisma.SurveyResponseWhereInput> {
    // Get the user's Orgs
    const orgs = await this.getUsersOrgs(user);

    // Only look at the surveyResponses where a specific answer contains one of the user's orgs
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
  }
}
