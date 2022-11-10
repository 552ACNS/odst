import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, of, tap } from 'rxjs';
import { logger } from 'nx/src/utils/logger';
import { FeedbackResponseService } from './feedbackResponse.service';
import { merge } from 'lodash';
import { Prisma } from '.prisma/ods/client';
import { setContext } from '@apollo/client/link/context';

@Injectable()
export class FeedbackResponseInterceptor implements NestInterceptor {
  constructor(private feedbackResponseService: FeedbackResponseService) {}
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
                in: await this.feedbackResponseService.getUsersOrgs(
                  ctx.req.user
                ),
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
}
