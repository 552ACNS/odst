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
  QuestionGQL,
  QuestionCreateInput,
  QuestionUpdateInput,
  QuestionWhereUniqueInput,
  SurveyWhereUniqueInput,
  AnswerGQL,
  SurveyGQL,
} from '@odst/types/ods';
//import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

@Resolver(() => QuestionGQL)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => [QuestionGQL], { name: 'findManyQuestions' })
  async findMany() {
    return this.questionService.findMany({});
  }

  @Query(() => [QuestionGQL], { name: 'getSubQuestions' })
  // @UseGuards(AccessTokenAuthGuard)
  //TODO redo with findMany
  async getSubQuestions(
    @Args('surveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput
  ) {
    return this.questionService.findQuestionsInSurvey(surveyWhereUniqueInput);
  }

  @Query(() => QuestionGQL, { name: 'findUniqueQuestion' })
  // @UseGuards(AccessTokenAuthGuard)
  async findUnique(
    @Args('questionWhereUniqueInput')
    questionWhereUniqueInput: QuestionWhereUniqueInput
  ) {
    return this.questionService.findUnique(questionWhereUniqueInput);
  }

  @Mutation(() => QuestionGQL, { name: 'createQuestion' })
  // @UseGuards(AccessTokenAuthGuard)
  create(
    @Args('questionCreateInput') questionCreateInput: QuestionCreateInput
  ) {
    return this.questionService.create(questionCreateInput);
  }

  @Mutation(() => QuestionGQL, { name: 'updateQuestion' })
  // @UseGuards(AccessTokenAuthGuard)
  async update(
    @Args('QuestionWhereUniqueInput')
    questionWhereUniqueInput: QuestionWhereUniqueInput,
    @Args('QuestionUpdateInput')
    questionUpdateInput: QuestionUpdateInput
  ) {
    return this.questionService.update(
      questionWhereUniqueInput,
      questionUpdateInput
    );
  }

  @Mutation(() => QuestionGQL, { name: 'deleteQuestion' })
  // @UseGuards(AccessTokenAuthGuard)
  async delete(
    @Args('questionWhereUniqueInput')
    questionWhereUniqueInput: QuestionWhereUniqueInput
  ) {
    return this.questionService.delete(questionWhereUniqueInput);
  }

  @ResolveField(() => [AnswerGQL])
  async answers(@Parent() question: QuestionGQL): Promise<AnswerGQL[]> {
    return this.questionService.answers({ id: question.id });
  }

  @ResolveField(() => [SurveyGQL])
  async surveys(@Parent() question: QuestionGQL): Promise<SurveyGQL[]> {
    return this.questionService.surveys({ id: question.id });
  }
}
