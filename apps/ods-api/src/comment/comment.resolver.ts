import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentGQL, UserGQL } from '@odst/types/ods';

@Resolver(() => CommentGQL)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @ResolveField(() => UserGQL)
  async author(@Parent() comment: CommentGQL): Promise<UserGQL | null> {
    return this.commentService.author({ id: comment.id });
  }
}
