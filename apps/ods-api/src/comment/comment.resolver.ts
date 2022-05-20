import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment, User, CommentCreateInput } from '@odst/types/ods';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment, { name: 'createComment' })
  create(
    @Args('commentCreateInput') commentCreateInput: CommentCreateInput
  ): Promise<Comment> {
    return this.commentService.create(commentCreateInput);
  }

  @ResolveField(() => User)
  async author(@Parent() comment: Comment): Promise<User | null> {
    return this.commentService.author({ id: comment.id });
  }
}
