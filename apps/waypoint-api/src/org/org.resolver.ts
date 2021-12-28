import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrgService } from './org.service';
import { OrgGQL, OrgCreateInput, OrgUpdateInput, OrgWhereUniqueInput } from '@odst/types';

@Resolver(() => OrgGQL)
export class OrgResolver {
  constructor(private readonly orgService: OrgService) {}

  @Mutation(() => OrgGQL, { name: 'createOrg' })
  create(@Args('orgCreateInput') orgCreateInput: OrgCreateInput) {
    return this.orgService.create(orgCreateInput);
  }

  @Query(() => [OrgGQL], { name: 'findManyOrgs' })
  async findMany(): Promise<OrgGQL[]> {
    return this.orgService.findMany();
  }

  @Query(() => [OrgGQL], { name: 'getSubOrgs' })
  async getSubOrgs(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
  ): Promise<OrgGQL[]> {
    return this.orgService.getSubOrgs(orgWhereUniqueInput);
  }

  @Query(() => OrgGQL, { name: 'findUniqueOrg' })
  async findUnique(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
  ) : Promise<OrgGQL | null > {
    return this.orgService.findUnique(orgWhereUniqueInput);
  }

  @Mutation(() => OrgGQL, { name: 'updateOrg' })
  async update(
    @Args('OrgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
    @Args('OrgUpdateInput')
    orgUpdateInput: OrgUpdateInput,
  ): Promise<OrgGQL> {
    return this.orgService.update(orgWhereUniqueInput, orgUpdateInput);
  }

  @Query(() => [OrgGQL], { name: 'removeOrg' })
  async delete(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
  ): Promise<OrgGQL> {
    return this.orgService.delete(orgWhereUniqueInput);
  }
}
