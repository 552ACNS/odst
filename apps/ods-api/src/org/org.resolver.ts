import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { OrgService } from './org.service';
import {
  OrgGQL,
  OrgCreateInput,
  OrgUpdateInput,
  OrgWhereUniqueInput,
  UserGQL,
  SurveyGQL,
} from '@odst/types/ods';
import { Public } from '@odst/auth';

@Resolver(() => OrgGQL)
export class OrgResolver {
  constructor(private readonly orgService: OrgService) {}

  @Public()
  @Query(() => [OrgGQL], { name: 'findManyOrgs' })
  async findMany(): Promise<OrgGQL[]> {
    return this.orgService.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  @Query(() => [OrgGQL], { name: 'getSubOrgs' })
  //TODO redo with findMany
  async getSubOrgs(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<OrgGQL[]> {
    return this.orgService.getSubOrgs(orgWhereUniqueInput);
  }

  @Query(() => OrgGQL, { name: 'findUniqueOrg' })
  async findUnique(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<OrgGQL | null> {
    return this.orgService.findUnique(orgWhereUniqueInput);
  }

  @Mutation(() => OrgGQL, { name: 'createOrg' })
  create(
    @Args('orgCreateInput') orgCreateInput: OrgCreateInput
  ): Promise<OrgGQL> {
    return this.orgService.create(orgCreateInput);
  }

  @Mutation(() => OrgGQL, { name: 'updateOrg' })
  async update(
    @Args('OrgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
    @Args('OrgUpdateInput')
    orgUpdateInput: OrgUpdateInput
  ): Promise<OrgGQL> {
    return this.orgService.update(orgWhereUniqueInput, orgUpdateInput);
  }

  @Mutation(() => OrgGQL, { name: 'deleteOrg' })
  async delete(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<{ deleted: boolean }> {
    return this.orgService.delete(orgWhereUniqueInput);
  }

  @ResolveField(() => [UserGQL])
  async users(@Parent() org: OrgGQL): Promise<UserGQL[]> {
    return this.orgService.users({ id: org.id });
  }

  @ResolveField(() => [OrgGQL])
  async children(@Parent() org: OrgGQL): Promise<OrgGQL[]> {
    return this.orgService.children({ id: org.id });
  }

  @ResolveField(() => OrgGQL, { nullable: true })
  async parent(@Parent() org: OrgGQL): Promise<OrgGQL | null> {
    return this.orgService.parent({ id: org.id });
  }

  @ResolveField(() => [SurveyGQL])
  async surveys(@Parent() org: OrgGQL): Promise<SurveyGQL[]> {
    return this.orgService.surveys({ id: org.id });
  }
}
