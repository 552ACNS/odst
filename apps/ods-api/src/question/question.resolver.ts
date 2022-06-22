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
  @Query(() => [Question], { name: 'getSubQuestions' })
  @Public()
  //TODO [ODST-300] redo getSubQuestions with findMany
  async getSubQuestions(
    @Args('feedbackWhereUniqueInput')
    feedbackWhereUniqueInput: FeedbackWhereUniqueInput
  ): Promise<Question[]> {
    return this.questionService.findQuestionsInFeedback(
      feedbackWhereUniqueInput
    );
  }

  @ResolveField(() => [Answer])
  async answers(@Parent() question: Question): Promise<Answer[]> {
    return this.questionService.answers({ id: question.id });
  }

  @ResolveField(() => [Feedback])
  async feedbacks(@Parent() question: Question): Promise<Feedback[]> {
    return this.questionService.feedbacks({ id: question.id });
  }
}
