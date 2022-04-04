import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { SurveyResponseService } from './surveyResponse.service';
import {
  SurveyResponseGQL,
  SurveyResponseCreateInput,
  SurveyResponseUpdateInput,
  SurveyResponseWhereUniqueInput,
  AnswerGQL,
  SurveyGQL,
  SurveyResponseWhereInput,
} from '@odst/types/ods';
import { SurveyService } from '../survey/survey.service';
import { AnswerService } from '../answer/answer.service';
//import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

@Resolver(() => SurveyResponseGQL)
export class SurveyResponseResolver {
  constructor(
    private readonly surveyResponseService: SurveyResponseService,
    private readonly answerService: AnswerService,
    private readonly surveyService: SurveyService
  ) {}

  @Query(() => [SurveyResponseGQL], { name: 'findManySurveyResponses' })
  // @UseGuards(AccessTokenAuthGuard)
  async findMany(
    @Args('where', { nullable: true }) where: SurveyResponseWhereInput
  ): Promise<SurveyResponseGQL[]> {
    // return this.surveyResponseService.findMany();
    return this.surveyResponseService.findMany({ where });
  }

  @Query(() => SurveyResponseGQL, { name: 'findUniqueSurveyResponse' })
  // @UseGuards(AccessTokenAuthGuard)
  async findUnique(
    @Args('surveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput
  ): Promise<SurveyResponseGQL | null> {
    return this.surveyResponseService.findUnique(
      surveyResponseWhereUniqueInput
    );
  }

  @Mutation(() => SurveyResponseGQL, { name: 'createSurveyResponse' })
  // @UseGuards(AccessTokenAuthGuard)
  create(
    @Args('surveyResponseCreateInput')
    surveyResponseCreateInput: SurveyResponseCreateInput
  ): Promise<SurveyResponseGQL> {
    return this.surveyResponseService.create(surveyResponseCreateInput);
  }

  @Mutation(() => SurveyResponseGQL, { name: 'updateSurveyResponse' })
  // @UseGuards(AccessTokenAuthGuard)
  async update(
    @Args('SurveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput,
    @Args('SurveyResponseUpdateInput')
    surveyResponseUpdateInput: SurveyResponseUpdateInput
  ): Promise<SurveyResponseGQL> {
    return this.surveyResponseService.update(
      surveyResponseWhereUniqueInput,
      surveyResponseUpdateInput
    );
  }

  @Mutation(() => SurveyResponseGQL, { name: 'deleteSurveyResponse' })
  // @UseGuards(AccessTokenAuthGuard)
  async delete(
    @Args('surveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput
  ): Promise<{ deleted: boolean }> {
    return this.surveyResponseService.delete(surveyResponseWhereUniqueInput);
  }

  @ResolveField(() => [AnswerGQL], { name: 'answers' })
  async answers(
    @Parent() surveyResponse: SurveyResponseGQL
  ): Promise<AnswerGQL[]> {
    return this.answerService.findMany({
      where: { surveyResponse: { id: surveyResponse.id } },
    });
  }

  @ResolveField(() => SurveyGQL, { name: 'survey' })
  async survey(
    @Parent() surveyResponse: SurveyResponseGQL
  ): Promise<SurveyGQL | null> {
    return this.surveyService.findUnique({
      id: surveyResponse.surveyId,
    });
  }
}
