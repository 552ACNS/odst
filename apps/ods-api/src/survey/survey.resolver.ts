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
  Question,
  SurveyResponse,
  OrgWhereUniqueInput,
} from '@odst/types/ods';
import { Public } from '@odst/auth';

@Resolver(() => SurveyGQL)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Query(() => [SurveyGQL], { name: 'findManySurveys' })
  async findMany(): Promise<SurveyGQL[]> {
    return this.surveyService.findMany({});
  }

  @Query(() => SurveyGQL, { name: 'findUniqueSurvey' })
  async findUnique(
    @Args('surveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput
  ): Promise<SurveyGQL | null> {
    return this.surveyService.findUnique(surveyWhereUniqueInput);
  }

  @Public()
  @Mutation(() => SurveyGQL, { name: 'createSurveyWithQuestions' })
  async createWithQuestions(
    @Args({ name: 'questionPrompts', type: () => [String] })
    questionPrompts: string[],
    @Args('orgWhereUniqueInput') orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<SurveyGQL | null> {
    return this.surveyService.createWithQuestions(
      questionPrompts,
      orgWhereUniqueInput
    );
  }

  @Mutation(() => SurveyGQL, { name: 'createSurvey' })
  create(
    @Args('surveyCreateInput') surveyCreateInput: SurveyCreateInput
  ): Promise<SurveyGQL> {
    return this.surveyService.create(surveyCreateInput);
  }

  @Mutation(() => SurveyGQL, { name: 'updateSurvey' })
  async update(
    @Args('SurveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput,
    @Args('SurveyUpdateInput')
    surveyUpdateInput: SurveyUpdateInput
  ): Promise<SurveyGQL> {
    return this.surveyService.update(surveyWhereUniqueInput, surveyUpdateInput);
  }

  @Mutation(() => SurveyGQL, { name: 'deleteSurvey' })
  async delete(
    @Args('surveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput
  ): Promise<{ deleted: boolean; message?: string }> {
    return this.surveyService.delete(surveyWhereUniqueInput);
  }

  @ResolveField(() => [OrgGQL])
  async orgs(@Parent() survey: SurveyGQL): Promise<OrgGQL[]> {
    return this.surveyService.orgs({ id: survey.id });
  }

  @ResolveField(() => [Question])
  async questions(@Parent() survey: SurveyGQL): Promise<Question[]> {
    return this.surveyService.questions({ id: survey.id });
  }

  @ResolveField(() => [SurveyResponse])
  async surveyResponses(
    @Parent() survey: SurveyGQL
  ): Promise<SurveyResponse[]> {
    return this.surveyService.surveyResponses({ id: survey.id });
  }
}
