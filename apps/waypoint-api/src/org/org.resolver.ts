import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrgService } from './org.service';
import {
  OrgGQL,
  OrgCreateInput,
  OrgUpdateInput,
  OrgWhereUniqueInput,
} from '@odst/types/waypoint';
import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => OrgGQL)
export class OrgResolver {
  constructor(private readonly orgService: OrgService) {}

  @Mutation(() => OrgGQL, { name: 'createOrg' })
  @UseGuards(AccessTokenAuthGuard)
  create(@Args('orgCreateInput') orgCreateInput: OrgCreateInput) {
    return this.orgService.create(orgCreateInput);
  }

  @Query(() => [OrgGQL], { name: 'findManyOrgs' })
  @UseGuards(AccessTokenAuthGuard)
  async findMany(): Promise<OrgGQL[]> {
    // return this.orgService.findMany();
    return this.orgService.orgs({
      orderBy: {
        name: 'asc',
      },
    });
  }

  @Query(() => [OrgGQL], { name: 'getSubOrgs' })
  @UseGuards(AccessTokenAuthGuard)
  async getSubOrgs(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<OrgGQL[]> {
    return this.orgService.getSubOrgs(orgWhereUniqueInput);
  }

  @Query(() => OrgGQL, { name: 'findUniqueOrg' })
  @UseGuards(AccessTokenAuthGuard)
  async findUnique(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<OrgGQL | null> {
    return this.orgService.findUnique(orgWhereUniqueInput);
  }

  @Mutation(() => OrgGQL, { name: 'updateOrg' })
  @UseGuards(AccessTokenAuthGuard)
  async update(
    @Args('OrgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput,
    @Args('OrgUpdateInput')
    orgUpdateInput: OrgUpdateInput
  ): Promise<OrgGQL> {
    return this.orgService.update(orgWhereUniqueInput, orgUpdateInput);
  }

  @Mutation(() => OrgGQL, { name: 'removeOrg' })
  @UseGuards(AccessTokenAuthGuard)
  async delete(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<OrgGQL> {
    return this.orgService.delete(orgWhereUniqueInput);
  }
}
