import { Injectable, Logger } from '@nestjs/common';
import {
  FeedbackResponse,
  Prisma,
  Feedback,
  Answer,
  Role,
  User,
  Tag,
  Comment,
} from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { merge } from 'lodash';
import { ResponseCount } from '../__types__';

@Injectable()
export class FeedbackResponseService {
  constructor(private prisma: PrismaService) {}

  //TODO write tests for this
  /**
   * Returns a number of responses for a based on criteria specified by API
   * @param user Current user, obtained from resolver
   * @param feedbackResponseCountArgs Arguments for the count query, also obtained from resolver
   * @returns A count of feedback responses based on the user's orgs
   */
  async count(
    user: User,
    feedbackResponseCountArgs: Prisma.FeedbackResponseCountArgs
  ): Promise<number> {
    // Please Fix
    // this.prisma.feedbackResponse.count

    // modify the feedback response count args to include the user's orgs

    return this.prisma.feedbackResponse.count(
      this.restrictor(
        user,
        feedbackResponseCountArgs
      ) as Prisma.FeedbackResponseCountArgs
    );
  }

  /**
   *
   * @param user Current user, obtained from resolver
   * @param args Arguments for the query/mutation, obtained from resolver
   * @returns A new query/mutation with the user's orgs added to the where clause
   */
  async restrictor(
    user: User,
    args: Prisma.FeedbackResponseCountArgs | Prisma.FeedbackResponseFindManyArgs
  ): Promise<
    Prisma.FeedbackResponseCountArgs | Prisma.FeedbackResponseFindManyArgs
  > {
    const restrictor: Prisma.FeedbackResponseWhereInput = {
      // whatever the previous where clause was, add the user's orgs to it
      AND: {
        // Get the original where feedbackresponse count args
        // Find me the feedbacks where the
        answers: {
          // answers have some
          some: {
            AND: {
              // question
              question: {
                // where the value is
                value: {
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

    // if the args has a where already, merge args with the restrictor
    if (args.where) {
      // the merge will modify the references in the left argument (args.where)
      merge(args.where, restrictor);
    } else {
      // args does not have a where, make it the restrictor
      args.where = restrictor;
    }

    return args;
  }

  async findUnique(
    feedbackResponseWhereUniqueInput: Prisma.FeedbackResponseWhereUniqueInput
  ): Promise<FeedbackResponse | null> {
    return this.prisma.feedbackResponse.findUnique({
      where: feedbackResponseWhereUniqueInput,
    });
  }

  async create(
    data: Prisma.FeedbackResponseCreateInput
  ): Promise<FeedbackResponse> {
    return this.prisma.feedbackResponse.create({
      data,
    });
  }

  async update(
    data: Prisma.FeedbackResponseUpdateInput,
    where: Prisma.FeedbackResponseWhereUniqueInput
  ): Promise<FeedbackResponse> {
    return this.prisma.feedbackResponse.update({ data, where });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'Delete feedbackResponses older than a year',
  })
  private async deleteFeedbackResponsesOlderThanAYear(): Promise<void> {
    Logger.log(
      'Deleting feedback responses older than a year',
      'FeedbackResponseService'
    );
    // TODO: Redo with try catch
    //Will silently fail if delete isn't cascaded properly
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [deleteAnswers, deleteFeedbackResponses] =
      await this.prisma.$transaction([
        this.prisma.answer.deleteMany({
          where: {
            feedbackResponse: {
              closedDate: { lt: new Date(Date.now() - 31536000000) },
            },
          },
        }),
        this.prisma.feedbackResponse.deleteMany({
          where: { closedDate: { lt: new Date(Date.now() - 31536000000) } },
        }),
      ]);
    if (deleteFeedbackResponses.count > 0) {
      Logger.log(
        `Deleted ${deleteFeedbackResponses.count} feedback responses`,
        'FeedbackResponseService'
      );
    }
  }

  // TODO: DELETE THIS ONCE FRONTEND IS RECONFIGURED
  async countResponses(user: User): Promise<ResponseCount> {
    const whereBasedOnUserOrgs = await this.getWhere(user);

    // TODO: Optimize at a later date, so we don't go back and forth to the server

    const [unresolved, overdue, resolved] = await this.prisma.$transaction([
      this.prisma.feedbackResponse.count({
        where: {
          resolved: false,
          ...whereBasedOnUserOrgs,
        },
      }),

      this.prisma.feedbackResponse.count({
        where: {
          openedDate: {
            lt: new Date(Date.now() - 2592000000),
          },
          resolved: false,
          ...whereBasedOnUserOrgs,
        },
      }),

      this.prisma.feedbackResponse.count({
        where: {
          resolved: true,
          ...whereBasedOnUserOrgs,
        },
      }),
    ]);

    return { unresolved, overdue, resolved };
  }

  determineStatus(resolved: string): Prisma.FeedbackResponseWhereInput {
    let whereIssues: Prisma.FeedbackResponseWhereInput = {};
    switch (resolved) {
      case 'overdue':
        whereIssues = {
          openedDate: {
            lt: new Date(Date.now() - 2592000000),
          },
          resolved: false,
        };
        break;
      case 'unresolved':
        whereIssues = {
          resolved: false,
        };
        break;
      case 'resolved':
        whereIssues = {
          resolved: true,
        };
        break;
    }
    return whereIssues;
  }

  async getIssuesByStatus(resolved: string, user: User): Promise<string[]> {
    return this.prisma.feedbackResponse
      .findMany({
        where: {
          ...this.determineStatus(resolved),
          ...(await this.getWhere(user)),
        },
        select: {
          id: true,
        },
        orderBy: {
          openedDate: 'desc',
        },
      })
      .then((responses) => responses.map((response) => response.id));
    //TODO Not ideal. frontend is doing some wonky delayed loading. Should just return all issues, or paginate them.
    //Using the findMany above so as to not repeat stuff in the servicer
  }

  async feedback(
    AnswerWhereUniqueInput: Prisma.AnswerWhereUniqueInput
  ): Promise<Feedback | null> {
    return this.prisma.feedbackResponse
      .findUnique({ where: AnswerWhereUniqueInput })
      .feedback();
  }

  async answers(
    feedbackResponseWhereUniqueInput: Prisma.FeedbackResponseWhereUniqueInput
  ): Promise<Answer[]> {
    return this.prisma.feedbackResponse
      .findUnique({ where: feedbackResponseWhereUniqueInput })
      .answers();
  }

  async tags(
    feedbackResponseWhereUniqueInput: Prisma.FeedbackResponseWhereUniqueInput
  ): Promise<Tag[]> {
    return this.prisma.feedbackResponse
      .findUnique({ where: feedbackResponseWhereUniqueInput })
      .tags();
  }
  async comments(
    feedbackResponseWhereUniqueInput: Prisma.FeedbackResponseWhereUniqueInput
  ): Promise<Comment[]> {
    return this.prisma.feedbackResponse
      .findUnique({ where: feedbackResponseWhereUniqueInput })
      .comments({
        orderBy: {
          date: 'asc',
        },
      });
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
  private async getWhere(
    user: User
  ): Promise<Prisma.FeedbackResponseWhereInput> {
    // Get the user's Orgs
    const orgs = await this.getUsersOrgs(user);

    // Only look at the feedbackResponses where a specific answer contains one of the user's orgs
    const whereAnswer = {
      answers: {
        some: {
          question: {
            value: {
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
          AND: {
            //no feedbackResponses that are routed outside
            routeOutside: false,
            OR: {
              ...whereAnswer,
              feedback: {
                orgs: {
                  some: { name: { in: orgs } },
                },
              },
            },
          },
        };
    }
  }
}
