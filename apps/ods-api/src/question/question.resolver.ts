import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { QuestionGQL } from '@odst/types/ods';
import { QuestionCreateInput } from '@odst/types/ods';
import { QuestionUpdateInput } from '@odst/types/ods';

@Resolver(() => QuestionGQL)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => QuestionGQL)
  createQuestion(
    @Args('createQuestionInput') createQuestionInput: QuestionCreateInput
  ) {
    return this.questionService.create(createQuestionInput);
  }

  @Query(() => [QuestionGQL], { name: 'question' })
  findAll() {
    return this.questionService.findAll();
  }

  @Query(() => QuestionGQL, { name: 'question' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.questionService.findOne(id);
  }

  @Mutation(() => QuestionGQL)
  updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: QuestionUpdateInput
  ) {
    return this.questionService.update(
      updateQuestionInput.id,
      updateQuestionInput
    );
  }

  @Mutation(() => QuestionGQL)
  removeQuestion(@Args('id', { type: () => Int }) id: string) {
    return this.questionService.remove(id);
  }
}
