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
import { Public } from '@odst/auth';

@Resolver(() => QuestionGQL)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => [QuestionGQL], { name: 'findManyQuestions' })
  async findMany(): Promise<QuestionGQL[]> {
    return this.questionService.findMany({});
  }

  @Query(() => [QuestionGQL], { name: 'getSubQuestions' })
  @Public()

  //TODO redo with findMany
  async getSubQuestions(
    @Args('surveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput
  ): Promise<QuestionGQL[]> {
    return this.questionService.findQuestionsInSurvey(surveyWhereUniqueInput);
  }

  @Query(() => QuestionGQL, { name: 'findUniqueQuestion' })
  async findUnique(
    @Args('questionWhereUniqueInput')
    questionWhereUniqueInput: QuestionWhereUniqueInput
  ): Promise<QuestionGQL | null> {
    return this.questionService.findUnique(questionWhereUniqueInput);
  }

  @Mutation(() => QuestionGQL, { name: 'createQuestion' })
  create(
    @Args('questionCreateInput') questionCreateInput: QuestionCreateInput
  ): Promise<QuestionGQL> {
    return this.questionService.create(questionCreateInput);
  }

  @Mutation(() => QuestionGQL, { name: 'updateQuestion' })
  async update(
    @Args('QuestionWhereUniqueInput')
    questionWhereUniqueInput: QuestionWhereUniqueInput,
    @Args('QuestionUpdateInput')
    questionUpdateInput: QuestionUpdateInput
  ): Promise<QuestionGQL> {
    return this.questionService.update(
      questionWhereUniqueInput,
      questionUpdateInput
    );
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
