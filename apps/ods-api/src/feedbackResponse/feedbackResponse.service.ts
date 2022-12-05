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
import { ResponseCount, TrackedFeedback } from '../__types__';

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
      feedbackResponseCountArgs as Prisma.FeedbackResponseCountArgs
    );
  }

  async findUnique(
    feedbackResponseWhereUniqueInput: Prisma.FeedbackResponseWhereUniqueInput
  ): Promise<FeedbackResponse | null> {
    return this.prisma.feedbackResponse.findUnique({
      where: feedbackResponseWhereUniqueInput,
    });
  }

  async feedbackResponseByID(
    feedbackResponseWhereUniqueInput: Prisma.FeedbackResponseWhereUniqueInput
  ): Promise<TrackedFeedback | null> {
    let trackedResults: TrackedFeedback | null;
    const result = await this.prisma.feedbackResponse.findUnique({
      where: feedbackResponseWhereUniqueInput,
      select: {
        resolvedComment: true,
        openedDate: true,
        closedDate: true,
        resolved: true,
        tags: {
          select: {
            value: true,
          },
          where: {
            type: {
              equals: 'Action',
            },
          },
        },
        reviewedBy: {
          select: {
            grade: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (result && result.reviewedBy) {
      trackedResults = {
        openedDate: result.openedDate,
        closedDate: result.closedDate,
        resolved: result.resolved,
        tags: result.tags.map((tag) => tag.value),
        grade: result.reviewedBy?.grade,
        firstName: result.reviewedBy?.firstName,
        lastName: result.reviewedBy?.lastName,
        resolvedComment: result.resolvedComment,
      };
    } else if (result) {
      trackedResults = {
        openedDate: result.openedDate,
        closedDate: result.closedDate,
        resolved: result.resolved,
        tags: result.tags.map((tag) => tag.value),
        grade: null,
        firstName: null,
        lastName: null,
        resolvedComment: result.resolvedComment,
      };
    } else {
      trackedResults = null;
    }

    return trackedResults;
  }
  async create(data: Prisma.FeedbackResponseCreateInput): Promise<{
    id: string;
  }> {
    return this.prisma.feedbackResponse.create({
      data,
      select: {
        id: true,
      },
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
    // TODO [ODST-272]: Redo with try catch
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
  async countResponses(user: User, where): Promise<ResponseCount> {
    // TODO: Optimize at a later date, so we don't go back and forth to the server

    const [unresolved, overdue, resolved] = await this.prisma.$transaction([
      this.prisma.feedbackResponse.count({
        where: {
          resolved: false,
          ...where,
        },
      }),

      this.prisma.feedbackResponse.count({
        where: {
          openedDate: {
            lt: new Date(Date.now() - 2592000000),
          },
          resolved: false,
          ...where,
        },
      }),

      this.prisma.feedbackResponse.count({
        where: {
          resolved: true,
          ...where,
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

  //gets the feedback response based on issue and index it is queired on and returns a feedback response object
  async getIssuesByStatus(
    status: string,
    user: User,
    skip: number,
    take: number,
    where
  ): Promise<FeedbackResponse[]> {
    return this.prisma.feedbackResponse.findMany({
      skip: skip,
      take: take,
      where: {
        ...this.determineStatus(status),
        ...where,
      },
      orderBy: {
        openedDate: 'desc',
      },
    });
    // .then((responses) => responses.map((response) => response.id));
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
  ): Promise<Answer[] | null> {
    return this.prisma.feedbackResponse
      .findUnique({ where: feedbackResponseWhereUniqueInput })
      .answers();
  }

  async tags(
    feedbackResponseWhereUniqueInput: Prisma.FeedbackResponseWhereUniqueInput
  ): Promise<Tag[] | null> {
    return this.prisma.feedbackResponse
      .findUnique({ where: feedbackResponseWhereUniqueInput })
      .tags();
  }

  async comments(
    feedbackResponseWhereUniqueInput: Prisma.FeedbackResponseWhereUniqueInput
  ): Promise<Comment[] | null> {
    return this.prisma.feedbackResponse
      .findUnique({ where: feedbackResponseWhereUniqueInput })
      .comments({
        orderBy: {
          date: 'asc',
        },
      });
  }
}
