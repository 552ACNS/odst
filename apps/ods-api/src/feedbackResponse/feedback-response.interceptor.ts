import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';
import { logger } from 'nx/src/utils/logger';

@Injectable()
export class FeedbackResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    logger.log(ctx.getContext().req.user.id);
    logger.log(ctx.getContext().req.user.role);
    return next.handle().pipe(tap((data) => logger.log(data)));
  }
}
