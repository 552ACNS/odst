import {
  Resolver,
  Mutation,
  Args,
  Query,
  Int,
  ResolveField,
  Parent,
  Context,
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
  UpdateOneFeedbackResponseArgs,
  FindManyFeedbackResponseArgs,
} from '@odst/types/ods';
import { Prisma } from '@prisma/client';
import { Public } from '@odst/auth';
import { GetCurrentUser } from '@odst/shared/nest';
import { ResponseCount, TrackedFeedback } from '../__types__';
import { UseInterceptors } from '@nestjs/common';
import { FeedbackResponseInterceptor } from './feedbackResponse.interceptor';

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

  @Public()
  @Query(() => TrackedFeedback, { name: 'feedbackResponseByID' })
  async feedbackResponseByID(
    @Args('feedbackResponseWhereUniqueInput')
    feedbackResponseWhereUniqueInput: FeedbackResponseWhereUniqueInput
  ): Promise<TrackedFeedback | null> {
    return this.feedbackResponseService.feedbackResponseByID(
      feedbackResponseWhereUniqueInput
    );
  }

  //TODO write tests for this
  @UseInterceptors(FeedbackResponseInterceptor)
  @Query(() => Int, { name: 'getResponseCount' })
  async count(
    @GetCurrentUser() user: User,
    @Context('req') req
  ): Promise<number> {
    return this.feedbackResponseService.count(user, req.body.variables.where);
  }

  @Mutation(() => String, { name: 'createFeedbackResponse' })
  @Public()
  async create(
    @Args('feedbackResponseCreateInput')
    feedbackResponseCreateInput: FeedbackResponseCreateInput
  ): Promise<string> {
    return (
      await this.feedbackResponseService.create(feedbackResponseCreateInput)
    ).id;
  }

  @UseInterceptors(FeedbackResponseInterceptor)
  @Mutation(() => FeedbackResponse, { name: 'updateFeedbackResponse' })
  async update(
    @Context('req') req,
    @Args()
    updateArgs: UpdateOneFeedbackResponseArgs
  ): Promise<FeedbackResponse> {
    const { data, where } = updateArgs;

    updateArgs.where = req.body.variables.where;

    return this.feedbackResponseService.update(
      data as Prisma.FeedbackResponseUpdateInput,
      where as Prisma.FeedbackResponseWhereUniqueInput
    );
  }

  // TODO [ODST-271]: DELETE THIS ONCE FRONTEND IS RECONFIGURED
  // TODO write tests for this
  @UseInterceptors(FeedbackResponseInterceptor)
  @Query(() => ResponseCount, { name: 'ResponseCount' })
  async ResponseCount(
    @GetCurrentUser() user: User,
    @Context('req') req
  ): Promise<ResponseCount> {
    return this.feedbackResponseService.countResponses(
      user,
      req.body.variables.where
    );
  }

  // TODO: Use the FindManyFeedbackResponse to use where instead of string status.
  //TODO: pass whole object of FindManyFeedbackResponseArgs instead of deconstructing object
  @UseInterceptors(FeedbackResponseInterceptor)
  @Query(() => [FeedbackResponse], { name: 'getIssuesByStatus' })
  async getIssuesByStatus(
    @Args('status') status: string,
    @GetCurrentUser() user: User,
    @Context('req') req,
    @Args() findManyFeedbackResponseArgs: FindManyFeedbackResponseArgs
  ): Promise<FeedbackResponse[]> {
    const { skip, take } = findManyFeedbackResponseArgs;
    return this.feedbackResponseService.getIssuesByStatus(
      status,
      user,
      Number(skip),
      Number(take),
      req.body.variables.where
    );
  }

  @UseInterceptors(FeedbackResponseInterceptor)
  @ResolveField(() => [Answer])
  async answers(
    @Parent() feedbackResponse: FeedbackResponse,
    @Context('req') req
  ): Promise<Answer[] | null> {
    return this.feedbackResponseService.answers({ id: feedbackResponse.id });
  }

  @ResolveField(() => Feedback)
  async feedback(
    @Parent() feedbackResponse: FeedbackResponse
  ): Promise<Feedback | null> {
    return this.feedbackResponseService.feedback({ id: feedbackResponse.id });
  }

  @ResolveField(() => [Tag])
  async tags(
    @Parent() feedbackResponse: FeedbackResponse
  ): Promise<Tag[] | null> {
    return this.feedbackResponseService.tags({ id: feedbackResponse.id });
  }

  @ResolveField(() => [Comment])
  async comments(
    @Parent() feedbackResponse: FeedbackResponse
  ): Promise<Comment[] | null> {
    return this.feedbackResponseService.comments({ id: feedbackResponse.id });
  }
}
