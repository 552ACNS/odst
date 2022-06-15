import {
  Resolver,
  Mutation,
  Args,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { QuestionService } from './question.service';
import {
  Question,
  FeedbackWhereUniqueInput,
  Answer,
  Feedback,
  UpdateOneQuestionArgs,
} from '@odst/types/ods';
import { Prisma } from '.prisma/ods/client';

import { Public } from '@odst/auth';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  //TODO write tests for this
  //TODO redo with findMany
  @Query(() => [Question], { name: 'getSubQuestions' })
  @Public()
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
