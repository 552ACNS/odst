import {
  Resolver,
  Mutation,
  Args,
  Query,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { FeedbackResponseService } from './feedbackResponse.service';
import {
  FeedbackResponse,
  FeedbackResponseCreateInput,
  FeedbackResponseWhereUniqueInput,
  Tag,
  Answer,
  Feedback,
  User,
  Comment,
  FeedbackResponseAggregateArgs,
  UpdateOneFeedbackResponseArgs,
  FindManyFeedbackResponseArgs,
} from '@odst/types/ods';
import { Prisma } from '.prisma/ods/client';
import { Public } from '@odst/auth';
import { GetCurrentUser } from '@odst/shared/nest';
import { ResponseCount } from '../__types__';

@Resolver(() => FeedbackResponse)
export class FeedbackResponseResolver {
  constructor(
    private readonly feedbackResponseService: FeedbackResponseService
  ) {}

  //TODO [ODST-270] findUnqiue is called from frontend, not sure how to prevent commanders from looking at other orgs' responses  //TODO findUnqiue is called from frontend, not sure how to prevent commanders from looking at other orgs' responses
  @Query(() => FeedbackResponse, { name: 'findUniqueFeedbackResponse' })
  async findUnique(
    @Args('feedbackResponseWhereUniqueInput')
    feedbackResponseWhereUniqueInput: FeedbackResponseWhereUniqueInput
  ): Promise<FeedbackResponse | null> {
    return this.feedbackResponseService.findUnique(
      feedbackResponseWhereUniqueInput
    );
  }

  //TODO write tests for this
  @Query(() => Int, { name: 'getResponseCount' })
  async count(
    @GetCurrentUser() user: User,
    @Args()
    feedbackResponseAggregateArgs: FeedbackResponseAggregateArgs
  ): Promise<number> {
    return this.feedbackResponseService.count(
      user,
      feedbackResponseAggregateArgs
    );
  }

  @Mutation(() => FeedbackResponse, { name: 'createFeedbackResponse' })
  @Public()
  async create(
    @Args('feedbackResponseCreateInput')
    feedbackResponseCreateInput: FeedbackResponseCreateInput
  ): Promise<FeedbackResponse> {
    return this.feedbackResponseService.create(feedbackResponseCreateInput);
  }

  @Mutation(() => FeedbackResponse, { name: 'updateFeedbackResponse' })
  async update(
    @Args()
    updateArgs: UpdateOneFeedbackResponseArgs
  ): Promise<FeedbackResponse> {
    const { data, where } = updateArgs;

    // Logger.log(info)

    return this.feedbackResponseService.update(
      data as Prisma.FeedbackResponseUpdateInput,
      where as Prisma.FeedbackResponseWhereUniqueInput
    );
  }

  // TODO [ODST-271]: DELETE THIS ONCE FRONTEND IS RECONFIGURED
  // TODO write tests for this
  @Query(() => ResponseCount, { name: 'ResponseCount' })
  async ResponseCount(@GetCurrentUser() user: User): Promise<ResponseCount> {
    return this.feedbackResponseService.countResponses(user);
  }

  // TODO: Use the FindManyFeedbackResponse to use where instead of string status.
  //TODO: pass whole object of FindManyFeedbackResponseArgs instead of deconstructing object
  @Query(() => [FeedbackResponse], { name: 'getIssuesByStatus' })
  async getIssuesByStatus(
    @Args('status') status: string,
    @GetCurrentUser() user: User,
    @Args() findManyFeedbackResponseArgs: FindManyFeedbackResponseArgs
  ): Promise<FeedbackResponse[]> {
    const { skip, take } = findManyFeedbackResponseArgs;
    return this.feedbackResponseService.getIssuesByStatus(
      status,
      user,
      Number(skip),
      Number(take)
    );
  }

  @ResolveField(() => [Answer])
  async answers(
    @Parent() feedbackResponse: FeedbackResponse
  ): Promise<Answer[]> {
    return this.feedbackResponseService.answers({ id: feedbackResponse.id });
  }

  @ResolveField(() => Feedback)
  async feedback(
    @Parent() feedbackResponse: FeedbackResponse
  ): Promise<Feedback | null> {
    return this.feedbackResponseService.feedback({ id: feedbackResponse.id });
  }

  @ResolveField(() => [Tag])
  async tags(@Parent() feedbackResponse: FeedbackResponse): Promise<Tag[]> {
    return this.feedbackResponseService.tags({ id: feedbackResponse.id });
  }

  @ResolveField(() => [Comment])
  async comments(
    @Parent() feedbackResponse: FeedbackResponse
  ): Promise<Comment[]> {
    return this.feedbackResponseService.comments({ id: feedbackResponse.id });
  }
}
