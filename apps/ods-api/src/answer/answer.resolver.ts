import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import {
  AnswerGQL,
  AnswerCreateInput,
  AnswerUpdateInput,
  AnswerWhereUniqueInput,
} from '@odst/types/ods';
//import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

@Resolver(() => AnswerGQL)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Query(() => [AnswerGQL], { name: 'findManyAnswers' })
  async findMany() {
    return this.answerService.findMany({});
  }

  @Query(() => AnswerGQL, { name: 'findUniqueAnswer' })
  // @UseGuards(AccessTokenAuthGuard)
  async findUnique(
    @Args('answerWhereUniqueInput')
    answerWhereUniqueInput: AnswerWhereUniqueInput
  ) {
    return this.answerService.findUnique(answerWhereUniqueInput);
  }

  @Mutation(() => AnswerGQL, { name: 'createAnswer' })
  // @UseGuards(AccessTokenAuthGuard)
  create(
    @Args('answerCreateInput') answerCreateInput: AnswerCreateInput
  ) {
    return this.answerService.create(answerCreateInput);
  }

  @Mutation(() => AnswerGQL, { name: 'updateAnswer' })
  // @UseGuards(AccessTokenAuthGuard)
  async update(
    @Args('AnswerWhereUniqueInput')
    answerWhereUniqueInput: AnswerWhereUniqueInput,
    @Args('AnswerUpdateInput')
    answerUpdateInput: AnswerUpdateInput
  ){
    return this.answerService.update(
      answerWhereUniqueInput,
      answerUpdateInput
    );
  }

  @Mutation(() => AnswerGQL, { name: 'deleteAnswer' })
  // @UseGuards(AccessTokenAuthGuard)
  async delete(
    @Args('answerWhereUniqueInput')
    answerWhereUniqueInput: AnswerWhereUniqueInput
  ): Promise<{ deleted: boolean }> {
    return this.answerService.delete(answerWhereUniqueInput);
  }
}
