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
  SurveyResponseWhereInput,
  SurveyResponseWhereUniqueInput,
  IssueCount,
  AnswerGQL,
  SurveyGQL,
} from '@odst/types/ods';

// import { GetCurrentUserId } from '@odst/shared/nest';
// import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

@Resolver(() => SurveyResponseGQL)
export class SurveyResponseResolver {
  constructor(private readonly surveyResponseService: SurveyResponseService) {}

  @Query(() => [SurveyResponseGQL], { name: 'findManySurveyResponses' })
  // @UseGuards(AccessTokenAuthGuard)

  async findMany(): Promise<SurveyResponseGQL[]> {
    return this.surveyResponseService.findMany({});
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
  async create(
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
    return await this.surveyResponseService.delete(
      surveyResponseWhereUniqueInput
    );
  }

  @Query(() => [String], { name: 'getIssuesByStatus' })
  // @UseGuards(AccessTokenAuthGuard)

  // TODO This line gets the current user ID but it requires a login system to exist first.
  // async getUnresolvedIssues(@GetCurrentUserId() userId: string): Promise<string[]> {
  async getIssuesByStatus(
    @Args('resolved') resolved: boolean
  ): Promise<string[]> {
    // return this.surveyResponseService.getUnresolvedIssues(userId);
    return await this.surveyResponseService.getIssuesByStatus(resolved);
  }

  @Query(() => SurveyResponseGQL, { name: 'getSurveyResponseData' })
  // @UseGuards(AccessTokenAuthGuard)
  async getSurveyResponseData(
    @Args('surveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput
  ) {
    return await this.surveyResponseService.getSurveyResponseData(
      surveyResponseWhereUniqueInput
    );
  }

  @Query(() => Number, { name: 'countSurveyResponse' })
  // @UseGuards(AccessTokenAuthGuard)
  async count(
    @Args('surveyResponseWhereInput')
    surveyResponseWhereInput: SurveyResponseWhereInput
  ) {
    return this.surveyResponseService.count(surveyResponseWhereInput);
  }

  @Query(() => IssueCount, { name: 'countIssues' })
  // @UseGuards(AccessTokenAuthGuard)
  async countIssues() {
    return this.surveyResponseService.countIssues();
  }

  @ResolveField(() => [AnswerGQL])
  async answers(
    @Parent() surveyResponse: SurveyResponseGQL
  ): Promise<AnswerGQL[]> {
    return this.surveyResponseService.answers({ id: surveyResponse.id });
  }

  @ResolveField(() => SurveyGQL)
  async survey(
    @Parent() surveyResponse: SurveyResponseGQL
  ): Promise<SurveyGQL | null> {
    return this.surveyResponseService.survey({ id: surveyResponse.id });
  }
}
