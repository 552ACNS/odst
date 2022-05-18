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
  QuestionCreateInput,
  QuestionUpdateInput,
  QuestionWhereUniqueInput,
  SurveyWhereUniqueInput,
  Answer,
  Survey,
} from '@odst/types/ods';
import { Public } from '@odst/auth';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => [Question], { name: 'findManyQuestions' })
  async findMany(): Promise<Question[]> {
    return this.questionService.findMany({});
  }

  @Query(() => [Question], { name: 'getSubQuestions' })
  @Public()

  //TODO redo with findMany
  async getSubQuestions(
    @Args('surveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput
  ): Promise<Question[]> {
    return this.questionService.findQuestionsInSurvey(surveyWhereUniqueInput);
  }

  @Query(() => Question, { name: 'findUniqueQuestion' })
  async findUnique(
    @Args('questionWhereUniqueInput')
    questionWhereUniqueInput: QuestionWhereUniqueInput
  ): Promise<Question | null> {
    return this.questionService.findUnique(questionWhereUniqueInput);
  }

  @Mutation(() => Question, { name: 'createQuestion' })
  create(
    @Args('questionCreateInput') questionCreateInput: QuestionCreateInput
  ): Promise<Question> {
    return this.questionService.create(questionCreateInput);
  }

  @Mutation(() => Question, { name: 'updateQuestion' })
  async update(
    @Args('QuestionWhereUniqueInput')
    questionWhereUniqueInput: QuestionWhereUniqueInput,
    @Args('QuestionUpdateInput')
    questionUpdateInput: QuestionUpdateInput
  ): Promise<Question> {
    return this.questionService.update(
      questionWhereUniqueInput,
      questionUpdateInput
    );
  }

  @ResolveField(() => [Answer])
  async answers(@Parent() question: Question): Promise<Answer[]> {
    return this.questionService.answers({ id: question.id });
  }

  @ResolveField(() => [Survey])
  async surveys(@Parent() question: Question): Promise<Survey[]> {
    return this.questionService.surveys({ id: question.id });
  }
}
