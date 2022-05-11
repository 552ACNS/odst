import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentGQL, UserGQL, CommentCreateInput } from '@odst/types/ods';

@Resolver(() => CommentGQL)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => CommentGQL, { name: 'createComment' })
  create(
    @Args('commentCreateInput') commentCreateInput: CommentCreateInput
  ): Promise<CommentGQL> {
    return this.commentService.create(commentCreateInput);
  }

  @ResolveField(() => UserGQL)
  async author(@Parent() comment: CommentGQL): Promise<UserGQL | null> {
    return this.commentService.author({ id: comment.id });
  }
}
