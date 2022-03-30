import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import {
  SurveyGQL,
  SurveyCreateInput,
  SurveyUpdateInput,
  SurveyWhereUniqueInput,
} from '@odst/types/ods';
//import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

@Resolver(() => SurveyGQL)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Query(() => [SurveyGQL], { name: 'findManySurveys' })
  // @UseGuards(AccessTokenAuthGuard)
  async findMany(): Promise<SurveyGQL[]> {
    // return this.surveyService.findMany();
    return this.surveyService.findMany({});
  }

  @Query(() => SurveyGQL, { name: 'findUniqueSurvey' })
  // @UseGuards(AccessTokenAuthGuard)
  async findUnique(
    @Args('surveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput
  ): Promise<SurveyGQL | null> {
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
  ): Promise<SurveyGQL> {
    return this.surveyService.update(surveyWhereUniqueInput, surveyUpdateInput);
  }

  @Mutation(() => SurveyGQL, { name: 'deleteSurvey' })
  // @UseGuards(AccessTokenAuthGuard)
  async delete(
    @Args('surveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput
  ): Promise<{ deleted: boolean }> {
    return this.surveyService.delete(surveyWhereUniqueInput);
  }
}
