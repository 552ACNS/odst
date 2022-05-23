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
  SurveyResponseWhereUniqueInput,
  Answer,
  Survey,
  User,
  Comment,
  FindManySurveyResponseArgs,
  SurveyResponseAggregateArgs,
  UpdateOneSurveyResponseArgs,
  SurveyResponseUpdateInput,
} from '@odst/types/ods';
import { Public } from '@odst/auth';
import { GetCurrentUser } from '@odst/shared/nest';
import { ResponseCount } from '../__types__';

@Resolver(() => SurveyResponse)
export class SurveyResponseResolver {
  constructor(private readonly surveyResponseService: SurveyResponseService) {}

  /**
   * Finds the SurveyResponses that match the provided criteria
   * @param user The user who is requesting the response count
   * @param findManySurveyResponseArgs The arguments for the findMany query
   * @returns The SurveyResponses that fit the findMany args set my API
   */
  @Query(() => [SurveyResponse], { name: 'findManySurveyResponses' })
  async findMany(
    @GetCurrentUser() user: User,
    @Args()
    findManySurveyResponseArgs: FindManySurveyResponseArgs
  ): Promise<SurveyResponse[]> {
    return this.surveyResponseService.findMany(
      user,
      findManySurveyResponseArgs
    );
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

  @Query(() => Int, { name: 'getResponseCount' })
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
    @Args()
    updateArgs: UpdateOneSurveyResponseArgs
  ): Promise<SurveyResponse> {
    console.log(updateArgs);

    const { data, where } = updateArgs;

    return this.surveyResponseService.update(
      data as SurveyResponseUpdateInput,
      where as SurveyResponseWhereUniqueInput
    );
  }

  @Mutation(() => SurveyResponse, { name: 'deleteSurveyResponse' })
  async delete(
    @Args('surveyResponseWhereUniqueInput')
    surveyResponseWhereUniqueInput: SurveyResponseWhereUniqueInput
  ): Promise<{ deleted: boolean }> {
    return this.surveyResponseService.delete(surveyResponseWhereUniqueInput);
  }

  // TODO: DELETE THIS ONCE FRONTEND IS RECONFIGURED

  @Query(() => ResponseCount, { name: 'ResponseCount' })
  async ResponseCount(@GetCurrentUser() user: User): Promise<ResponseCount> {
    return this.surveyResponseService.countResponses(user);
  }

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

  @ResolveField(() => [Comment])
  async comments(@Parent() surveyResponse: SurveyResponse): Promise<Comment[]> {
    return this.surveyResponseService.comments({ id: surveyResponse.id });
  }
}
