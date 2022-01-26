import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { TokenExpiredError } from 'jsonwebtoken'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
  getRequest(context: ExecutionContext){
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err, user, info: Error) {
    if (info instanceof TokenExpiredError) {
      // do stuff when token is expired
      console.log('token expired');
    }
    return user;
  }
}
