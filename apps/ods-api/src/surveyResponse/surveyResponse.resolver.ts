import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SurveyResponseService } from './surveyResponse.service';
import {
  SurveyResponseGQL,
  SurveyResponseCreateInput,
  SurveyResponseUpdateInput,
  SurveyResponseWhereInput,
  SurveyResponseWhereUniqueInput,
} from '@odst/types/ods';
// import { GetCurrentUserId } from '@odst/shared/nest';
// import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

@Resolver(() => SurveyResponseGQL)
export class SurveyResponseResolver {
  constructor(private readonly surveyResponseService: SurveyResponseService) {}

  @Query(() => SurveyResponseGQL, { name: 'findUniqueSurveyResponse' })
  // @UseGuards(AccessTokenAuthGuard)
  async findUnique(
    @Args('surveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput
  ) {
    return this.surveyResponseService.findUnique(
      surveyResponseWhereUniqueInput
    );
  }

  @Mutation(() => SurveyResponseGQL, { name: 'createSurveyResponse' })
  // @UseGuards(AccessTokenAuthGuard)
  async create(
    @Args('surveyResponseCreateInput')
    surveyResponseCreateInput: SurveyResponseCreateInput
  ) {
    return this.surveyResponseService.create(surveyResponseCreateInput);
  }

  @Mutation(() => SurveyResponseGQL, { name: 'updateSurveyResponse' })
  // @UseGuards(AccessTokenAuthGuard)
  async update(
    @Args('SurveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput,
    @Args('SurveyResponseUpdateInput')
    surveyResponseUpdateInput: SurveyResponseUpdateInput
  ) {
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

  @Query(() => SurveyResponseGQL, { name: 'countSurveyResponse' })
  // @UseGuards(AccessTokenAuthGuard)
  async count(
    @Args('surveyResponseWhereUniqueInput')
    surveyResponseWhereInput: SurveyResponseWhereInput
  ) {
    return this.surveyResponseService.count(surveyResponseWhereInput);
  }
}
