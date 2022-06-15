import {
  Resolver,
  Mutation,
  Args,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
// eslint-disable-next-line no-restricted-imports
import { FeedbackService } from './feedback.service';
import {
  Feedback,
  FeedbackCreateInput,
  FeedbackWhereUniqueInput,
  Org,
  Question,
  FeedbackResponse,
  OrgWhereUniqueInput,
  UpdateOneFeedbackArgs,
  FeedbackUpdateInput,
} from '@odst/types/ods';
import { Prisma } from '.prisma/ods/client';

import { Public } from '@odst/auth';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Query(() => [Feedback], { name: 'findManyFeedbacks' })
  async findMany(): Promise<Feedback[]> {
    return this.feedbackService.findMany({});
  }

  @Query(() => Feedback, { name: 'findUniqueFeedback' })
  async findUnique(
    @Args('feedbackWhereUniqueInput')
    feedbackWhereUniqueInput: FeedbackWhereUniqueInput
  ): Promise<Feedback | null> {
    return this.feedbackService.findUnique(feedbackWhereUniqueInput);
  }

  @Public()
  @Mutation(() => Feedback, { name: 'createFeedbackWithQuestions' })
  async createWithQuestions(
    @Args({ name: 'questionValues', type: () => [String] })
    questionValues: string[],
    @Args('orgWhereUniqueInput') orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<Feedback | null> {
    return this.feedbackService.createWithQuestions(
      questionValues,
      orgWhereUniqueInput
    );
  }

  @Mutation(() => Feedback, { name: 'createFeedback' })
  create(
    @Args('feedbackCreateInput') feedbackCreateInput: FeedbackCreateInput
  ): Promise<Feedback> {
    return this.feedbackService.create(feedbackCreateInput);
  }

  @Mutation(() => Feedback, { name: 'updateFeedback' })
  async update(@Args() updateArgs: UpdateOneFeedbackArgs): Promise<Feedback> {
    //Type coercion is required here because there is a bug in typescript
    //where entities with several relations overflow the stack

    const { data, where } = updateArgs;

    return this.feedbackService.update(
      data as Prisma.FeedbackUpdateInput,
      where as Prisma.FeedbackWhereUniqueInput
    );
  }

  @Mutation(() => Feedback, { name: 'deleteFeedback' })
  async delete(
    @Args('feedbackWhereUniqueInput')
    feedbackWhereUniqueInput: FeedbackWhereUniqueInput
  ): Promise<{ deleted: boolean; message?: string }> {
    return this.feedbackService.delete(feedbackWhereUniqueInput);
  }

  @ResolveField(() => [Org])
  async orgs(@Parent() feedback: Feedback): Promise<Org[]> {
    return this.feedbackService.orgs({ id: feedback.id });
  }

  @ResolveField(() => [Question])
  async questions(@Parent() feedback: Feedback): Promise<Question[]> {
    return this.feedbackService.questions({ id: feedback.id });
  }

  @ResolveField(() => [FeedbackResponse])
  async feedbackResponses(
    @Parent() feedback: Feedback
  ): Promise<FeedbackResponse[]> {
    return this.feedbackService.feedbackResponses({ id: feedback.id });
  }
}
