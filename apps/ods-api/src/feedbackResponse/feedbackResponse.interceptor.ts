import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { FeedbackResponseService } from './feedbackResponse.service';
import { merge } from 'lodash';
import { Prisma, Role, User } from '.prisma/ods/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedbackResponseInterceptor implements NestInterceptor {
  constructor(
    private feedbackResponseService: FeedbackResponseService,
    private prisma: PrismaService
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context).getContext();

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
                  equals: 'What organization did the event occur in?',
                },
              },
              // and that value
              value: {
                // is contained in the user's orgs
                in: await this.getUsersOrgs(ctx.req.user),
              },
            },
          },
        },
      },
    };

    // if the args has a where already, merge args with the restrictor
    if (ctx.req.body.variables.where) {
      // the merge will modify the references in the left argument (args.where)
      merge(ctx.req.body.variables.where, restrictor);
    } else {
      // args does not have a where, make it the restrictor
      ctx.req.body.variables.where = restrictor;
    }

    return next.handle();
  }

  /**
   *
   * @param user Current user
   * @returns An array of Org Names ['552 ACNS', '552 ACW', '752 OSS'] etc.
   */
  async getUsersOrgs(user: User): Promise<string[]> {
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
}
