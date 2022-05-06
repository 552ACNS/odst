import {
  Resolver,
  Mutation,
  Args,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
// eslint-disable-next-line no-restricted-imports
import { Prisma } from '.prisma/ods/client';
import { SurveyService } from './survey.service';
import {
  Survey,
  SurveyCreateInput,
  SurveyUpdateInput,
  SurveyWhereUniqueInput,
  Org,
  Question,
  SurveyResponse,
  OrgWhereUniqueInput,
} from '../__types__/';
import { Public } from '@odst/auth';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Query(() => [Survey], { name: 'findManySurveys' })
  async findMany(): Promise<Survey[]> {
    return this.surveyService.findMany({});
  }

  @Query(() => Survey, { name: 'findUniqueSurvey' })
  async findUnique(
    @Args('surveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput
  ): Promise<Survey | null> {
    return this.surveyService.findUnique(surveyWhereUniqueInput);
  }

  @Public()
  @Mutation(() => Survey, { name: 'createSurveyWithQuestions' })
  async createWithQuestions(
    @Args({ name: 'questionPrompts', type: () => [String] })
    questionPrompts: string[],
    @Args('orgWhereUniqueInput') orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<Survey | null> {
    return this.surveyService.createWithQuestions(
      questionPrompts,
      orgWhereUniqueInput
    );
  }

  @Mutation(() => Survey, { name: 'createSurvey' })
  create(
    @Args('surveyCreateInput') surveyCreateInput: SurveyCreateInput
  ): Promise<Survey> {
    return this.surveyService.create(surveyCreateInput);
  }

  @Mutation(() => Survey, { name: 'updateSurvey' })
  async update(
    @Args('SurveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput,
    @Args('SurveyUpdateInput')
    surveyUpdateInput: SurveyUpdateInput
  ): Promise<Survey> {
    //Type coercion is required here because there is a bug in typescript
    //where entities with several relations overflow the stack
    return this.surveyService.update(surveyWhereUniqueInput, surveyUpdateInput);
  }

  @Mutation(() => Survey, { name: 'deleteSurvey' })
  async delete(
    @Args('surveyWhereUniqueInput')
    surveyWhereUniqueInput: SurveyWhereUniqueInput
  ): Promise<{ deleted: boolean; message?: string }> {
    return this.surveyService.delete(surveyWhereUniqueInput);
  }

  @ResolveField(() => [Org])
  async orgs(@Parent() survey: Survey): Promise<Org[]> {
    return this.surveyService.orgs({ id: survey.id });
  }

  @ResolveField(() => [Question])
  async questions(@Parent() survey: Survey): Promise<Question[]> {
    return this.surveyService.questions({ id: survey.id });
  }

  @ResolveField(() => [SurveyResponse])
  async surveyResponses(@Parent() survey: Survey): Promise<SurveyResponse[]> {
    return this.surveyService.surveyResponses({ id: survey.id });
  }
}
