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
  Org,
  OrgCreateInput,
  OrgUpdateInput,
  OrgWhereUniqueInput,
  User,
  Survey,
} from '../__types__/';
import { Public } from '@odst/auth';

@Resolver(() => Org)
export class OrgResolver {
  constructor(private readonly orgService: OrgService) {}

  @Public()
  @Query(() => [Org], { name: 'findManyOrgs' })
  async findMany(): Promise<Org[]> {
    return this.orgService.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  @Query(() => [Org], { name: 'getSubOrgs' })
  //TODO redo with findMany
  async getSubOrgs(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<Org[]> {
    return this.orgService.getSubOrgs(orgWhereUniqueInput);
  }

  @Query(() => Org, { name: 'findUniqueOrg' })
  async findUnique(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<Org | null> {
    return this.orgService.findUnique(orgWhereUniqueInput);
  }

  @Mutation(() => Org, { name: 'createOrg' })
  create(@Args('orgCreateInput') orgCreateInput: OrgCreateInput): Promise<Org> {
    return this.orgService.create(orgCreateInput);
  }

  @Mutation(() => Org, { name: 'updateOrg' })
  async update(
    @Args('OrgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
    @Args('OrgUpdateInput')
    orgUpdateInput: OrgUpdateInput
  ): Promise<Org> {
    return this.orgService.update(orgWhereUniqueInput, orgUpdateInput);
  }

  @Mutation(() => Org, { name: 'deleteOrg' })
  async delete(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<{ deleted: boolean }> {
    return this.orgService.delete(orgWhereUniqueInput);
  }

  @ResolveField(() => [User])
  async users(@Parent() org: Org): Promise<User[]> {
    return this.orgService.users({ id: org.id });
  }

  @ResolveField(() => [Org])
  async children(@Parent() org: Org): Promise<Org[]> {
    return this.orgService.children({ id: org.id });
  }

  @ResolveField(() => Org)
  async parent(@Parent() org: Org): Promise<Org | null> {
    return this.orgService.parent({ id: org.id });
  }

  @ResolveField(() => [Survey])
  async surveys(@Parent() org: Org): Promise<Survey[]> {
    return this.orgService.surveys({ id: org.id });
  }
}
