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
  ResponseCount,
} from '@odst/types/ods';
import { Public } from '@odst/auth';

@Resolver(() => SurveyResponseGQL)
export class SurveyResponseResolver {
  constructor(private readonly surveyResponseService: SurveyResponseService) {}

  @Query(() => [SurveyResponseGQL], { name: 'findManySurveyResponses' })
  async findMany(): Promise<SurveyResponseGQL[]> {
    return this.surveyResponseService.findMany({});
  }

  @Query(() => SurveyResponseGQL, { name: 'findUniqueSurveyResponse' })
  async findUnique(
    @Args('surveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput
  ): Promise<SurveyResponseGQL | null> {
    return this.surveyResponseService.findUnique(
      surveyResponseWhereUniqueInput
    );
  }

  @Mutation(() => SurveyResponseGQL, { name: 'createSurveyResponse' })
  @Public()
  async create(
    @Args('surveyResponseCreateInput')
    surveyResponseCreateInput: SurveyResponseCreateInput
  ): Promise<SurveyResponseGQL> {
    return this.surveyResponseService.create(surveyResponseCreateInput);
  }

  @Mutation(() => SurveyResponseGQL, { name: 'updateSurveyResponse' })
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
  async delete(
    @Args('surveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput
  ): Promise<{ deleted: boolean }> {
    return this.surveyResponseService.delete(surveyResponseWhereUniqueInput);
  }

  @Query(() => ResponseCount, { name: 'ResponseCount' })
  async ResponseCount(): Promise<ResponseCount> {
    return this.surveyResponseService.countResponses();
  }

  @Query(() => [String], { name: 'getIssuesByStatus' })

  // TODO This line gets the current user ID but it requires a login system to exist first.
  // async getUnresolvedIssues(@GetCurrentUserId() userId: string): Promise<string[]> {
  async getIssuesByStatus(
    @Args('resolved') resolved: string
  ): Promise<string[]> {
    // return this.surveyResponseService.getUnresolvedIssues(userId);
    return this.surveyResponseService.getIssuesByStatus(resolved);
  }

  @Query(() => SurveyResponseGQL, { name: 'getSurveyResponseData' })
  async getSurveyResponseData(
    @Args('surveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput
  ): Promise<SurveyResponseGQL | null> {
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
