import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment, User } from '@odst/types/ods';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @ResolveField(() => User)
  async author(@Parent() comment: Comment): Promise<User | null> {
    return this.commentService.author({ id: comment.id });
  }
}
