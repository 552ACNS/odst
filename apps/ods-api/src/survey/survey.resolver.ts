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
  SurveyWhereInput,
} from '@odst/types/ods';
import { SurveyResponseService } from '../surveyResponse/surveyResponse.service';
import { OrgService } from '../org/org.service';
import { QuestionService } from '../question/question.service';
//import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

@Resolver(() => SurveyGQL)
export class SurveyResolver {
  constructor(
    private readonly surveyService: SurveyService,
    private readonly orgService: OrgService,
    private readonly questionService: QuestionService,
    private readonly surveyResponseService: SurveyResponseService
  ) {}

  @Query(() => [SurveyGQL], { name: 'findManySurveys' })
  // @UseGuards(AccessTokenAuthGuard)
  async findMany(@Args('where', { nullable: true }) where: SurveyWhereInput) {
    // return this.surveyService.findMany();
    return this.surveyService.findMany({ where });
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
    return this.orgService.findMany({
      where: { surveys: { some: { id: survey.id } } },
    });
  }

  @ResolveField(() => [QuestionGQL], { name: 'questions' })
  async questions(@Parent() survey: SurveyGQL) {
    return this.questionService.findMany({
      where: { surveys: { some: {id: survey.id} } },
    });
  }

  @ResolveField(() => [SurveyResponseGQL], { name: 'surveyResponses' })
  async surveyResponses(@Parent() survey: SurveyGQL) {
    return this.surveyResponseService.findMany({
      where: { survey: { id: survey.id } },
    });
  }
}
