import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrgService } from './org.service';
import { OrgGQL, OrgCreateInput, OrgUpdateInput, OrgWhereUniqueInput } from '@odst/types';
import { JwtAuthGUard } from '../auth/jwt.auth-guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => OrgGQL)
export class OrgResolver {
  constructor(private readonly orgService: OrgService) {}

  @Mutation(() => OrgGQL, { name: 'createOrg' })
  @UseGuards(JwtAuthGUard)
  create(@Args('orgCreateInput') orgCreateInput: OrgCreateInput) {
    return this.orgService.create(orgCreateInput);
  }

  @Query(() => [OrgGQL], { name: 'findManyOrgs' })
  @UseGuards(JwtAuthGUard)
  async findMany(): Promise<OrgGQL[]> {
    return this.orgService.findMany();
  }

  @Query(() => [OrgGQL], { name: 'getSubOrgs' })
  @UseGuards(JwtAuthGUard)
  async getSubOrgs(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
  ): Promise<OrgGQL[]> {
    return this.orgService.getSubOrgs(orgWhereUniqueInput);
  }

  @Query(() => OrgGQL, { name: 'findUniqueOrg' })
  @UseGuards(JwtAuthGUard)
  async findUnique(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
  ) : Promise<OrgGQL | null > {
    return this.orgService.findUnique(orgWhereUniqueInput);
  }

  @Mutation(() => OrgGQL, { name: 'updateOrg' })
  @UseGuards(JwtAuthGUard)
  async update(
    @Args('OrgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
    @Args('OrgUpdateInput')
    orgUpdateInput: OrgUpdateInput,
  ): Promise<OrgGQL> {
    return this.orgService.update(orgWhereUniqueInput, orgUpdateInput);
  }

  @Query(() => [OrgGQL], { name: 'removeOrg' })
  @UseGuards(JwtAuthGUard)
  async delete(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
  ): Promise<OrgGQL> {
    return this.orgService.delete(orgWhereUniqueInput);
  }
}
