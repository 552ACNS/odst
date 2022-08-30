import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { OrgService } from './org.service';
import { Org, User, Feedback, OrgTier, OrgCreateInput } from '@odst/types/ods';
import { Public } from '@odst/auth';
import { Args } from '@nestjs/graphql';
import { GetCurrentUser } from '@odst/shared/nest';

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

  @Query(() => [String])
  async getOrgsBelowTier(
    @Args('orgTier', { type: () => OrgTier }) tier: OrgTier
  ): Promise<string[]> {
    return this.orgService.getOrgsBelowTier(tier);
  }

  @Query(() => [String])
  async getOrgsAboveTier(
    @Args('orgTier', { type: () => OrgTier }) tier: OrgTier
  ): Promise<string[]> {
    return this.orgService.getOrgsAboveTier(tier);
  }

  @Query(() => [String])
  async getTiersByUser(@GetCurrentUser() user: User): Promise<string[]> {
    return this.orgService.getTiersByUser(user);
  }

  @Mutation(() => String, { name: 'createOrg' })
  async createOrg(
    @GetCurrentUser() user: User,
    @Args('orgCreateInput') orgCreateInput: OrgCreateInput
  ): Promise<string> {
    return (await this.orgService.createOrg(user, orgCreateInput)).id;
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
