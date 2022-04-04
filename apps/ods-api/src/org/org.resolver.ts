import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrgService } from './org.service';
import { UserService } from '../user/user.service';
import { SurveyService } from '../survey/survey.service';
import {
  OrgGQL,
  OrgCreateInput,
  OrgUpdateInput,
  OrgWhereUniqueInput,
  UserGQL,
  SurveyGQL,
} from '@odst/types/ods';
import { OrgWhereInput } from '@odst/types/ods';
//import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

@Resolver(() => OrgGQL)
export class OrgResolver {
  constructor(
    private readonly orgService: OrgService,
    private readonly userService: UserService,
    private readonly surveyService: SurveyService
  ) {}

  @Query(() => [OrgGQL], { name: 'findManyOrgs' })
  // @UseGuards(AccessTokenAuthGuard)
  async findMany(
    @Args('where', { nullable: true }) where: OrgWhereInput
  ): Promise<OrgGQL[]> {
    return this.orgService.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    });
  }

  @Query(() => [OrgGQL], { name: 'getSubOrgs' })
  //TODO redo with findMany
  // @UseGuards(AccessTokenAuthGuard)
  async getSubOrgs(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<OrgGQL[]> {
    return this.orgService.getSubOrgs(orgWhereUniqueInput);
  }

  @Query(() => OrgGQL, { name: 'findUniqueOrg' })
  // @UseGuards(AccessTokenAuthGuard)
  async findUnique(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<OrgGQL | null> {
    return this.orgService.findUnique(orgWhereUniqueInput);
  }

  @Mutation(() => OrgGQL, { name: 'createOrg' })
  // @UseGuards(AccessTokenAuthGuard)
  create(
    @Args('orgCreateInput') orgCreateInput: OrgCreateInput
  ): Promise<OrgGQL> {
    return this.orgService.create(orgCreateInput);
  }

  @Mutation(() => OrgGQL, { name: 'updateOrg' })
  // @UseGuards(AccessTokenAuthGuard)
  async update(
    @Args('OrgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
    @Args('OrgUpdateInput')
    orgUpdateInput: OrgUpdateInput
  ): Promise<OrgGQL> {
    return this.orgService.update(orgWhereUniqueInput, orgUpdateInput);
  }

  @Mutation(() => OrgGQL, { name: 'deleteOrg' })
  // @UseGuards(AccessTokenAuthGuard)
  async delete(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<{ deleted: boolean }> {
    return this.orgService.delete(orgWhereUniqueInput);
  }

  @ResolveField(() => [UserGQL], { name: 'users' })
  async users(@Parent() org: OrgGQL): Promise<UserGQL[]> {
    return this.userService.findMany({
      where: { orgs: { some: { id: org.id } } },
    });
  }

  @ResolveField(() => [OrgGQL], { name: 'children' })
  async children(@Parent() org: OrgGQL): Promise<OrgGQL[]> {
    return this.orgService.findMany({
      where: { parent: { id: org.id } },
    });
  }

  @ResolveField(() => OrgGQL, { name: 'parent', nullable: true })
  async parent(@Parent() org: OrgGQL): Promise<OrgGQL | null> {
    //parentId is of type string or null.
    //id in WhereUniqueInput is of type string or undefined.
    //this check is to make those types happy
    if (!org.parentId) {
      return null;
    }
    return this.orgService.findUnique({
      id: org.parentId,
    });
  }

  @ResolveField(() => [SurveyGQL], { name: 'surveys' })
  async surveys(@Parent() org: OrgGQL): Promise<SurveyGQL[]> {
    return this.surveyService.findMany({
      where: { orgs: { some: { id: org.id } } },
    });
  }
}
