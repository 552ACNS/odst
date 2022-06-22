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
  FindManyFeedbackResponseArgs,
  FeedbackResponseAggregateArgs,
  UpdateOneFeedbackResponseArgs,
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

  /**
   * Finds the FeedbackResponses that match the provided criteria
   * @param user The user who is requesting the response count
   * @param findManyFeedbackResponseArgs The arguments for the findMany query
   * @returns The FeedbackResponses that fit the findMany args set my API
   */
  @Query(() => [FeedbackResponse], { name: 'findManyFeedbackResponses' })
  async findMany(
    @GetCurrentUser() user: User,
    @Args()
    findManyFeedbackResponseArgs: FindManyFeedbackResponseArgs
  ): Promise<FeedbackResponse[]> {
    return this.feedbackResponseService.findMany(
      user,
      findManyFeedbackResponseArgs
    );
  }

  //TODO findUnqiue is called from frontend, not sure how to prevent commanders from looking at other orgs' responses
  @Query(() => FeedbackResponse, { name: 'findUniqueFeedbackResponse' })
  async findUnique(
    @Args('feedbackResponseWhereUniqueInput')
    feedbackResponseWhereUniqueInput: FeedbackResponseWhereUniqueInput
  ): Promise<FeedbackResponse | null> {
    return this.feedbackResponseService.findUnique(
      feedbackResponseWhereUniqueInput
    );
  }

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

  @Mutation(() => FeedbackResponse, { name: 'deleteFeedbackResponse' })
  async delete(
    @Args('feedbackResponseWhereUniqueInput')
    feedbackResponseWhereUniqueInput: FeedbackResponseWhereUniqueInput
  ): Promise<{ deleted: boolean }> {
    return this.feedbackResponseService.delete(
      feedbackResponseWhereUniqueInput
    );
  }

  // TODO: DELETE THIS ONCE FRONTEND IS RECONFIGURED

  @Query(() => ResponseCount, { name: 'ResponseCount' })
  async ResponseCount(@GetCurrentUser() user: User): Promise<ResponseCount> {
    return this.feedbackResponseService.countResponses(user);
  }

  // TODO: Use the FindManyFeedbackResponse Arg from generator instead of this.
  @Query(() => [FeedbackResponse], { name: 'getIssuesByStatus' })
  async getIssuesByStatus(
    @Args('status') status: string,
    @GetCurrentUser() user: User,
    @Args('skip') skip: number,
    @Args('take') take: number
  ): Promise<FeedbackResponse[]> {
    return this.feedbackResponseService.getIssuesByStatus(
      status,
      user,
      skip,
      take
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
