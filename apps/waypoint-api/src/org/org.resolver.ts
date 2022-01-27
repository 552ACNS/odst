import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrgService } from './org.service';
import { OrgGQL, OrgCreateInput, OrgUpdateInput, OrgWhereUniqueInput } from '@odst/types';
import { JwtAuthGuard } from '../auth/jwt.auth-guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => OrgGQL)
export class OrgResolver {
  constructor(private readonly orgService: OrgService) {}

  @Mutation(() => OrgGQL, { name: 'createOrg' })
  @UseGuards(JwtAuthGuard)
  create(@Args('orgCreateInput') orgCreateInput: OrgCreateInput) {
    return this.orgService.create(orgCreateInput);
  }

  @Query(() => [OrgGQL], { name: 'findManyOrgs' })
  @UseGuards(JwtAuthGuard)
  async findMany(): Promise<OrgGQL[]> {
    // return this.orgService.findMany();
    return this.orgService.orgs({
      orderBy: {
        name: "asc"
      }
    })
  }

  @Query(() => [OrgGQL], { name: 'getSubOrgs' })
  @UseGuards(JwtAuthGuard)
  async getSubOrgs(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
  ): Promise<OrgGQL[]> {
    return this.orgService.getSubOrgs(orgWhereUniqueInput);
  }

  @Query(() => OrgGQL, { name: 'findUniqueOrg' })
  @UseGuards(JwtAuthGuard)
  async findUnique(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
  ) : Promise<OrgGQL | null > {
    return this.orgService.findUnique(orgWhereUniqueInput);
  }

  @Mutation(() => OrgGQL, { name: 'updateOrg' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Args('OrgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
    @Args('OrgUpdateInput')
    orgUpdateInput: OrgUpdateInput,
  ): Promise<OrgGQL> {
    return this.orgService.update(orgWhereUniqueInput, orgUpdateInput);
  }

  @Mutation(() => OrgGQL, { name: 'removeOrg' })
  @UseGuards(JwtAuthGuard)
  async delete(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
  ): Promise<OrgGQL> {
    return this.orgService.delete(orgWhereUniqueInput);
  }
}
