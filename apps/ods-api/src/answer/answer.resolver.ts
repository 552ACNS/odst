import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer, Question, FeedbackResponse } from '@odst/types/ods';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @ResolveField(() => Question)
  async question(@Parent() answer: Answer): Promise<Question | null> {
    return this.answerService.question({ id: answer.id });
  }

  @ResolveField(() => FeedbackResponse)
  async feedbackResponse(
    @Parent() answer: Answer
  ): Promise<FeedbackResponse | null> {
    return this.answerService.feedbackResponse({ id: answer.id });
  }
}
