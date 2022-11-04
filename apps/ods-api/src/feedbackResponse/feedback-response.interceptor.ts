import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';
import { logger } from 'nx/src/utils/logger';
import { FeedbackResponseService } from './feedbackResponse.service';

@Injectable()
export class FeedbackResponseInterceptor implements NestInterceptor {
  constructor(private feedbackResponseService: FeedbackResponseService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const ctx = GqlExecutionContext.create(context);

    logger.log(ctx.getContext().req.user);
    ctx.getContext().req.user.orgs =
      await this.feedbackResponseService.getUsersOrgs(
        ctx.getContext().req.user
      );
    logger.log(ctx.getContext().req.user);

    return next.handle().pipe(tap((data) => logger.log(data)));
  }
}
