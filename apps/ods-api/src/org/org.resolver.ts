import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { OrgService } from './org.service';
import { Org, User, Feedback, OrgTier } from '@odst/types/ods';
import { Public } from '@odst/auth';
import { Args } from '@nestjs/graphql';
// import { OrgTier as GraphqlOrgTier } from 'libs/gql/src/graphql-generated';

@Resolver(() => Org)
export class OrgResolver {
  constructor(private readonly orgService: OrgService) {}

  @Public()
  @Query(() => [String], { name: 'getOrgLineage' })
  async getOrgLineage(): Promise<string[]> {
    return this.orgService.getLineage();
  }

  @Public()
  @Query(() => [String], { name: 'getOrgNames' })
  async getOrgNames(): Promise<string[]> {
    return this.orgService.getOrgNames();
  }

  // @Public()
  // @Query(() => [String])
  // async getOrgTiers(): Promise<string[]> {
  //   return this.orgService.getOrgTiers();
  // }

  //TODO: remove @public eventually
  //TODO: replace { type: () => String } with { type: () => GraphqlOrgTier } when its fixed
  @Public()
  @Query(() => [String])
  async getOrgsBelowTier(
    @Args('orgTier', { type: () => OrgTier }) tier: OrgTier
  ): Promise<string[]> {
    return this.orgService.getOrgsBelowTier(tier);
  }

  //TODO: remove @public eventually
  //TODO: replace { type: () => String } with { type: () => GraphqlOrgTier } when it's fixed
  @Public()
  @Query(() => [String])
  async getOrgsAboveTier(
    @Args('orgTier', { type: () => OrgTier }) tier: OrgTier
  ): Promise<string[]> {
    return this.orgService.getOrgsAboveTier(tier);
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

  @ResolveField(() => [Feedback])
  async feedbacks(@Parent() org: Org): Promise<Feedback[]> {
    return this.orgService.feedbacks({ id: org.id });
  }
}
