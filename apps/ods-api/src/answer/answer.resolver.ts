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
  AnswerGQL,
  AnswerCreateInput,
  AnswerWhereUniqueInput,
  QuestionGQL,
  SurveyResponseGQL,
  AnswerWhereInput,
} from '@odst/types/ods';

@Resolver(() => AnswerGQL)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Query(() => [AnswerGQL], { name: 'findManyAnswers' })
  async findMany(
    @Args('where', { nullable: true }) where: AnswerWhereInput
  ): Promise<AnswerGQL[]> {
    return this.answerService.findMany({ where });
  }

  @Query(() => AnswerGQL, { name: 'findUniqueAnswer' })
  async findUnique(
    @Args('answerWhereUniqueInput')
    answerWhereUniqueInput: AnswerWhereUniqueInput
  ): Promise<AnswerGQL | null> {
    return this.answerService.findUnique(answerWhereUniqueInput);
  }

  @Mutation(() => AnswerGQL, { name: 'createAnswer' })
  create(
    @Args('answerCreateInput') answerCreateInput: AnswerCreateInput
  ): Promise<AnswerGQL> {
    return this.answerService.create(answerCreateInput);
  }

  @ResolveField(() => QuestionGQL)
  async question(@Parent() answer: AnswerGQL): Promise<QuestionGQL | null> {
    return this.answerService.question({ id: answer.id });
  }

  @ResolveField(() => SurveyResponseGQL)
  async surveyResponse(
    @Parent() answer: AnswerGQL
  ): Promise<SurveyResponseGQL | null> {
    return this.answerService.surveyResponse({ id: answer.id });
  }
}
