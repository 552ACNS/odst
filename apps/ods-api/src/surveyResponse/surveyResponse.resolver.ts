import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
  ObjectType,
} from '@nestjs/graphql';
import { SurveyResponseService } from './surveyResponse.service';
import {
  SurveyResponseGQL,
  SurveyResponseCreateInput,
  SurveyResponseUpdateInput,
  SurveyResponseWhereUniqueInput,
  AnswerGQL,
  SurveyGQL,
  ResponseCount,
  statuses,
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
    // return this.surveyResponseService.findMany();
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
    return this.surveyResponseService.delete(surveyResponseWhereUniqueInput);
  }

  @Query(() => ResponseCount, { name: 'ResponseCount' })
  // @UseGuards(AccessTokenAuthGuard)
  async ResponseCount(): Promise<ResponseCount> {
    return this.surveyResponseService.countResponses();
  }

  @Query(() => statuses, { name: 'getResponseByStatus' })
  async getResponseByStatus(): Promise<statuses> {
    return this.surveyResponseService.getResponseStatus();
  }

  @Query(() => [String], { name: 'getIssuesByStatus' })
  // @UseGuards(AccessTokenAuthGuard)

  // TODO This line gets the current user ID but it requires a login system to exist first.
  // async getUnresolvedIssues(@GetCurrentUserId() userId: string): Promise<string[]> {
  async getIssuesByStatus(
    @Args('resolved') resolved: boolean
  ): Promise<string[]> {
    // return this.surveyResponseService.getUnresolvedIssues(userId);
    return this.surveyResponseService.getIssuesByStatus(resolved);
  }

  @Query(() => SurveyResponseGQL, { name: 'getSurveyResponseData' })
  // @UseGuards(AccessTokenAuthGuard)
  async getSurveyResponseData(
    @Args('surveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput
  ) {
    return this.surveyResponseService.getSurveyResponseData(
      surveyResponseWhereUniqueInput
    );
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
