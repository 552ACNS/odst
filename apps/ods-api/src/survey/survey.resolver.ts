import {
  Resolver,
  Mutation,
  Args,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import {
  SurveyGQL,
  SurveyCreateInput,
  SurveyUpdateInput,
  SurveyWhereUniqueInput,
  OrgGQL,
  QuestionGQL,
  SurveyResponseGQL,
} from '@odst/types/ods';
//import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

@Resolver(() => SurveyGQL)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Query(() => [SurveyGQL], { name: 'findManySurveys' })
  // @UseGuards(AccessTokenAuthGuard)
  async findMany() {
    return this.surveyService.findMany({});
  }

  @Query(() => SurveyGQL, { name: 'findUniqueSurvey' })
  // @UseGuards(AccessTokenAuthGuard)
  async findUnique(
    @Args('surveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput
  ) {
    return this.surveyService.findUnique(surveyWhereUniqueInput);
  }

  @Mutation(() => SurveyGQL, { name: 'createSurvey' })
  // @UseGuards(AccessTokenAuthGuard)
  create(@Args('surveyCreateInput') surveyCreateInput: SurveyCreateInput) {
    return this.surveyService.create(surveyCreateInput);
  }

  @Mutation(() => SurveyGQL, { name: 'updateSurvey' })
  // @UseGuards(AccessTokenAuthGuard)
  async update(
    @Args('SurveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput,
    @Args('SurveyUpdateInput')
    surveyUpdateInput: SurveyUpdateInput
  ) {
    return this.surveyService.update(surveyWhereUniqueInput, surveyUpdateInput);
  }

  @Mutation(() => SurveyGQL, { name: 'deleteSurvey' })
  // @UseGuards(AccessTokenAuthGuard)
  async delete(
    @Args('surveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput
  ) {
    return this.surveyService.delete(surveyWhereUniqueInput);
  }

  @ResolveField(() => [OrgGQL], { name: 'orgs' })
  async orgs(@Parent() survey: SurveyGQL) {
    return this.surveyService.orgs({ id: survey.id });
  }

  @ResolveField(() => [QuestionGQL])
  async questions(@Parent() survey: SurveyGQL): Promise<QuestionGQL[]> {
    return this.surveyService.questions({ id: survey.id });
  }

  @ResolveField(() => [SurveyResponseGQL])
  async surveyResponses(
    @Parent() survey: SurveyGQL
  ): Promise<SurveyResponseGQL[]> {
    return this.surveyService.surveyResponses({ id: survey.id });
  }
}
