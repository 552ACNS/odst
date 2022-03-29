import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import {
  QuestionGQL,
  QuestionWhereUniqueInput,
} from './entities/question.entity';
import { QuestionCreateInput } from './dto/create-question.input';
import { QuestionUpdateInput } from './dto/update-question.input';

@Resolver(() => QuestionGQL)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => QuestionGQL, { name: 'createQuestion' })
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: QuestionCreateInput
  ) {
    return this.questionService.create(createQuestionInput);
  }

  @Query(() => [QuestionGQL], { name: 'findQuestionsInSurvey' })
  findQuestionsInSurvey(surveyId: string) {
    return this.questionService.findQuestionsInSurvey(surveyId);
  }

  // @Query(() => QuestionGQL, { name: 'question' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.questionService.findOne(id);
  // }

  @Mutation(() => QuestionGQL)
  updateQuestion(
    @Args('questionWhereUniqueInput')
    questionWhereUniqueInput: QuestionWhereUniqueInput,
    @Args('updateQuestionInput') questionUpdateInput: QuestionUpdateInput
  ) {
    return this.questionService.update(
      questionWhereUniqueInput,
      questionUpdateInput
    );
  }

  // @Mutation(() => QuestionGQL)
  // removeQuestion(@Args('id', { type: () => Int }) id: number) {
  //   return this.questionService.remove(id);
  // }
}
