import { Resolver, Args, Query, Parent, ResolveField } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import {
  Question,
  FeedbackWhereUniqueInput,
  Answer,
  Feedback,
} from '@odst/types/ods';
import { Public } from '@odst/auth';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  //TODO write tests for this
  //TODO redo with findMany
  @Query(() => [String], { name: 'getSubQuestions' })
  @Public()
  //TODO [ODST-300] redo getSubQuestions with findMany
  async getSubQuestions(
    @Args('feedbackWhereUniqueInput')
    feedbackWhereUniqueInput: FeedbackWhereUniqueInput
  ): Promise<string[]> {
    return (
      await this.questionService.findQuestionsInFeedback(
        feedbackWhereUniqueInput
      )
    ).map(({ id }) => id);
  }

  @ResolveField(() => [Answer])
  async answers(@Parent() question: Question): Promise<Answer[] | null> {
    return this.questionService.answers({ id: question.id });
  }

  @ResolveField(() => [Feedback])
  async feedbacks(@Parent() question: Question): Promise<Feedback[] | null> {
    return this.questionService.feedbacks({ id: question.id });
  }
}
