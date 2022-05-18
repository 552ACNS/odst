import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrgService } from './org.service';
import {
  Org,
  OrgCreateInput,
  OrgUpdateInput,
  OrgWhereUniqueInput,
} from '@odst/types/waypoint';
import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Org)
export class OrgResolver {
  constructor(private readonly orgService: OrgService) {}

  @Mutation(() => Org, { name: 'createOrg' })
  @UseGuards(AccessTokenAuthGuard)
  create(@Args('orgCreateInput') orgCreateInput: OrgCreateInput): Promise<Org> {
    return this.orgService.create(orgCreateInput);
  }

  @Query(() => [Org], { name: 'findManyOrgs' })
  @UseGuards(AccessTokenAuthGuard)
  async findMany(): Promise<Org[]> {
    // return this.orgService.findMany();
    return this.orgService.orgs({
      orderBy: {
        name: 'asc',
      },
    });
  }

  @Query(() => [Org], { name: 'getSubOrgs' })
  @UseGuards(AccessTokenAuthGuard)
  async getSubOrgs(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<Org[]> {
    return this.orgService.getSubOrgs(orgWhereUniqueInput);
  }

  @Query(() => Org, { name: 'findUniqueOrg' })
  @UseGuards(AccessTokenAuthGuard)
  async findUnique(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<Org | null> {
    return this.orgService.findUnique(orgWhereUniqueInput);
  }

  @Mutation(() => Org, { name: 'updateOrg' })
  @UseGuards(AccessTokenAuthGuard)
  async update(
    @Args('OrgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
    @Args('OrgUpdateInput')
    orgUpdateInput: OrgUpdateInput
  ): Promise<Org> {
    return this.orgService.update(orgWhereUniqueInput, orgUpdateInput);
  }

  @Mutation(() => Org, { name: 'deleteOrg' })
  @UseGuards(AccessTokenAuthGuard)
  async delete(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<Org> {
    return this.orgService.delete(orgWhereUniqueInput);
  }
}
