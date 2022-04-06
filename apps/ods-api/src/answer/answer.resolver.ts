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
  AnswerUpdateInput,
  AnswerWhereUniqueInput,
  QuestionGQL,
  SurveyResponseGQL,
} from '@odst/types/ods';
import { QuestionService } from '../question/question.service';
import { SurveyResponseService } from '../surveyResponse/surveyResponse.service';
//import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

@Resolver(() => AnswerGQL)
export class AnswerResolver {
  constructor(
    private readonly answerService: AnswerService,
    private readonly questionService: QuestionService,
    private readonly surveyResponseService: SurveyResponseService
  ) {}

  @Query(() => [AnswerGQL], { name: 'findManyAnswers' })
  async findMany(): Promise<AnswerGQL[]> {
    return this.answerService.findMany({});
  }

  @Query(() => AnswerGQL, { name: 'findUniqueAnswer' })
  // @UseGuards(AccessTokenAuthGuard)
  async findUnique(
    @Args('answerWhereUniqueInput')
    answerWhereUniqueInput: AnswerWhereUniqueInput
  ): Promise<AnswerGQL | null> {
    return this.answerService.findUnique(answerWhereUniqueInput);
  }

  @Mutation(() => AnswerGQL, { name: 'createAnswer' })
  // @UseGuards(AccessTokenAuthGuard)
  create(
    @Args('answerCreateInput') answerCreateInput: AnswerCreateInput
  ): Promise<AnswerGQL> {
    return this.answerService.create(answerCreateInput);
  }

  @Mutation(() => AnswerGQL, { name: 'updateAnswer' })
  // @UseGuards(AccessTokenAuthGuard)
  async update(
    @Args('AnswerWhereUniqueInput')
    answerWhereUniqueInput: AnswerWhereUniqueInput,
    @Args('AnswerUpdateInput')
    answerUpdateInput: AnswerUpdateInput
  ): Promise<AnswerGQL> {
    return this.answerService.update(answerWhereUniqueInput, answerUpdateInput);
  }

  @Mutation(() => AnswerGQL, { name: 'deleteAnswer' })
  // @UseGuards(AccessTokenAuthGuard)
  async delete(
    @Args('answerWhereUniqueInput')
    answerWhereUniqueInput: AnswerWhereUniqueInput
  ): Promise<{ deleted: boolean }> {
    return this.answerService.delete(answerWhereUniqueInput);
  }

  @ResolveField(() => QuestionGQL, { name: 'question' })
  async question(@Parent() answer: AnswerGQL): Promise<QuestionGQL | null> {
    return this.questionService.findUnique({
      id: answer.questionId,
    });
  }

  @ResolveField(() => SurveyResponseGQL, { name: 'surveyResponse' })
  async surveyResponse(
    @Parent() answer: AnswerGQL
  ): Promise<SurveyResponseGQL | null> {
    return this.surveyResponseService.findUnique({
      id: answer.surveyResponseId,
    });
  }
}
