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
  QuestionWhereInput,
} from '@odst/types/ods';
import { AnswerService } from '../answer/answer.service';
import { SurveyService } from '../survey/survey.service';
//import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

@Resolver(() => QuestionGQL)
export class QuestionResolver {
  constructor(
    private readonly questionService: QuestionService,
    private readonly surveyService: SurveyService,
    private readonly answerService: AnswerService
  ) {}

  @Query(() => [QuestionGQL], { name: 'findManyQuestions' })
  async findMany(@Args('where', { nullable: true }) where: QuestionWhereInput) {
    return this.questionService.findMany({ where });
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

  @ResolveField(() => [AnswerGQL], { name: 'answers' })
  async answers(@Parent() question: QuestionGQL) {
    const { id } = question;
    return this.answerService.findMany({ where: { question: { id } } });
  }

  @ResolveField(() => [SurveyGQL], { name: 'surveys' })
  async surveys(@Parent() question: QuestionGQL) {
    const { id } = question;
    return this.surveyService.findMany({
      where: { questions: { some: { id } } },
    });
  }
}
