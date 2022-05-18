import {
  Resolver,
  Mutation,
  Args,
  Query,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { SurveyResponseService } from './surveyResponse.service';
import {
  SurveyResponse,
  SurveyResponseCreateInput,
  SurveyResponseUpdateInput,
  SurveyResponseWhereUniqueInput,
  Answer,
  Survey,
  ResponseCount,
  User,
  FindManySurveyResponseArgs,
  SurveyResponseAggregateArgs,
} from '../__types__/';
import { Public } from '@odst/auth';
import { GetCurrentUser } from '@odst/shared/nest';

@Resolver(() => SurveyResponse)
export class SurveyResponseResolver {
  constructor(private readonly surveyResponseService: SurveyResponseService) {}

  @Query(() => [SurveyResponse], { name: 'findManySurveyResponses' })
  async findMany(
    @Args()
    findManySurveyResponseArgs: FindManySurveyResponseArgs
  ): Promise<SurveyResponse[]> {
    return this.surveyResponseService.findMany(findManySurveyResponseArgs);
  }

  //TODO findUnqiue is called from frontend, not sure how to prevent commanders from looking at other orgs' responses
  @Query(() => SurveyResponse, { name: 'findUniqueSurveyResponse' })
  async findUnique(
    @Args('surveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput
  ): Promise<SurveyResponse | null> {
    return this.surveyResponseService.findUnique(
      surveyResponseWhereUniqueInput
    );
  }

  @Query(() => Int, { name: 'ResponseCount' })
  async count(
    @GetCurrentUser() user: User,
    @Args()
    surveyResponseAggregateArgs: SurveyResponseAggregateArgs
  ): Promise<number> {
    return this.surveyResponseService.count(user, surveyResponseAggregateArgs);
  }

  @Mutation(() => SurveyResponse, { name: 'createSurveyResponse' })
  @Public()
  async create(
    @Args('surveyResponseCreateInput')
    surveyResponseCreateInput: SurveyResponseCreateInput
  ): Promise<SurveyResponse> {
    return this.surveyResponseService.create(surveyResponseCreateInput);
  }

  @Mutation(() => SurveyResponse, { name: 'updateSurveyResponse' })
  async update(
    @Args('SurveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput,
    @Args('SurveyResponseUpdateInput')
    surveyResponseUpdateInput: SurveyResponseUpdateInput
  ): Promise<SurveyResponse> {
    return this.surveyResponseService.update(
      surveyResponseWhereUniqueInput,
      surveyResponseUpdateInput
    );
  }

  @Mutation(() => SurveyResponse, { name: 'deleteSurveyResponse' })
  async delete(
    @Args('surveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput
  ): Promise<{ deleted: boolean }> {
    return this.surveyResponseService.delete(surveyResponseWhereUniqueInput);
  }

  // @Query(() => ResponseCount, { name: 'ResponseCount' })
  // async ResponseCount(@GetCurrentUser() user: User): Promise<ResponseCount> {
  //   return this.surveyResponseService.countResponses(user);
  // }

  @Query(() => [String], { name: 'getIssuesByStatus' })
  async getIssuesByStatus(
    @Args('resolved') resolved: string,
    @GetCurrentUser() user: User
  ): Promise<string[]> {
    return this.surveyResponseService.getIssuesByStatus(resolved, user);
  }

  @ResolveField(() => [Answer])
  async answers(@Parent() surveyResponse: SurveyResponse): Promise<Answer[]> {
    return this.surveyResponseService.answers({ id: surveyResponse.id });
  }

  @ResolveField(() => Survey)
  async survey(
    @Parent() surveyResponse: SurveyResponse
  ): Promise<Survey | null> {
    return this.surveyResponseService.survey({ id: surveyResponse.id });
  }
}
