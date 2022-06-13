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

  @Query(() => [Question], { name: 'getSubQuestions' })
  @Public()

  //TODO redo with findMany
  async getSubQuestions(
    @Args('feedbackWhereUniqueInput')
    feedbackWhereUniqueInput: FeedbackWhereUniqueInput
  ): Promise<Question[]> {
    return this.questionService.findQuestionsInFeedback(
      feedbackWhereUniqueInput
    );
  }

  @Mutation(() => Question, { name: 'updateQuestion' })
  async update(@Args() updateArgs: UpdateOneQuestionArgs): Promise<Question> {
    const { where, data } = updateArgs;

    return this.questionService.update(
      where as Prisma.QuestionWhereUniqueInput,
      data as Prisma.QuestionUpdateInput
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
