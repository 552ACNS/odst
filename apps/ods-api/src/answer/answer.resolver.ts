import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import {
  Answer,
  AnswerCreateInput,
  AnswerWhereUniqueInput,
  Question,
  SurveyResponse,
} from '../__types__/';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Query(() => [Answer], { name: 'findManyAnswers' })
  async findMany(): Promise<Answer[]> {
    return this.answerService.findMany({});
  }

  @Query(() => Answer, { name: 'findUniqueAnswer' })
  async findUnique(
    @Args('answerWhereUniqueInput')
    answerWhereUniqueInput: AnswerWhereUniqueInput
  ): Promise<Answer | null> {
    return this.answerService.findUnique(answerWhereUniqueInput);
  }

  @Mutation(() => Answer, { name: 'createAnswer' })
  create(
    @Args('answerCreateInput') answerCreateInput: AnswerCreateInput
  ): Promise<Answer> {
    return this.answerService.create(answerCreateInput);
  }

  @ResolveField(() => Question)
  async question(@Parent() answer: Answer): Promise<Question | null> {
    return this.answerService.question({ id: answer.id });
  }

  @ResolveField(() => SurveyResponse)
  async surveyResponse(
    @Parent() answer: Answer
  ): Promise<SurveyResponse | null> {
    return this.answerService.surveyResponse({ id: answer.id });
  }
}
