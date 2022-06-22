import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer, Question } from '@odst/types/ods';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @ResolveField(() => Question)
  async question(@Parent() answer: Answer): Promise<Question | null> {
    return this.answerService.question({ id: answer.id });
  }
}
