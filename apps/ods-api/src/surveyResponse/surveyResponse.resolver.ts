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
  SurveyResponseWhereInput,
  UserGQL,
} from '@odst/types/ods';
import { Public } from '@odst/auth';
import { GetCurrentUser } from '@odst/shared/nest';

@Resolver(() => SurveyResponseGQL)
export class SurveyResponseResolver {
  constructor(private readonly surveyResponseService: SurveyResponseService) {}

  @Query(() => [SurveyResponseGQL], { name: 'findManySurveyResponses' })
  async findMany(
    @Args('where', { nullable: true }) where: SurveyResponseWhereInput
  ): Promise<SurveyResponseGQL[]> {
    return this.surveyResponseService.findMany({ where });
  }

  //TODO findUnqiue is called from frontend, not sure how to prevent commanders from looking at other orgs' responses
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
  async ResponseCount(@GetCurrentUser() user: UserGQL): Promise<ResponseCount> {
    return this.surveyResponseService
      .countResponses({
        //survey where org contains user's id
        survey: { orgs: { some: { users: { some: { id: user.id } } } } },
      })
      .then((counts) => ({
        unresolved: counts[0],
        overdue: counts[1],
        resolved: counts[2],
      }));
  }

  @Query(() => [String], { name: 'getIssuesByStatus' })
  async getIssuesByStatus(
    @Args('resolved') resolved: boolean,
    @GetCurrentUser() user: UserGQL
  ): Promise<string[]> {
    return (
      this.surveyResponseService
        .findMany({
          where: {
            resolution: resolved ? { not: null } : null,
            survey: { orgs: { some: { users: { some: { id: user.id } } } } },
          },
          // select: {
          //   id: true,
          // },
          orderBy: {
            openedDate: 'asc',
          },
        })
        //Not ideal. frontend is doing some wonky delayed loading. Should just return all issues, or paginate them.
        //Using the findMany above so as to not repeat stuff in the servicer
        .then((responses) => responses.map((response) => response.id))
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
