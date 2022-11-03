import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { OrgService } from './org.service';
import {
  Org,
  User,
  Feedback,
  OrgTier,
  OrgCreateInput,
  UpdateOneOrgArgs,
  OrgWhereUniqueInput,
} from '@odst/types/ods';
import { Public } from '@odst/auth';
import { Args } from '@nestjs/graphql';
import { GetCurrentUser } from '@odst/shared/nest';
import { Prisma } from '.prisma/ods/client';

@Resolver(() => Org)
export class OrgResolver {
  constructor(private readonly orgService: OrgService) {}

  @Query(() => [String], { name: 'getUserOrgsNames' })
  async getUserOrgsNames(@GetCurrentUser() user: User): Promise<string[]> {
    return this.orgService.getUserOrgsNames(user);
  }

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
  async getOrgChildren(
    @Args('orgName', { type: () => String }) name: string
  ): Promise<string[]> {
    return this.orgService.getOrgChildren(name);
  }

  @Query(() => Boolean)
  async checkOrg(
    @Args('orgName', { type: () => String }) name: string
  ): Promise<boolean> {
    return this.orgService.checkOrg(name);
  }

  @Query(() => OrgTier)
  async getOrgTier(
    @Args('orgName') name: string
  ): Promise<OrgTier | string | undefined> {
    return this.orgService.getOrgTier(name);
  }

  @Query(() => [String])
  async getOrgsBelowTier(
    @Args('orgTier', { type: () => OrgTier }) tier: OrgTier
  ): Promise<string[]> {
    return this.orgService.getOrgsBelowTier(tier);
  }

  @Query(() => [String])
  async getOrgsBelowTierWithKeepParents(
    @Args('orgTier', { type: () => OrgTier }) tier: OrgTier
  ): Promise<string[]> {
    return this.orgService.getOrgsBelowTierWithKeepParents(tier);
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

  @Mutation(() => Org, { name: 'updateOrg' })
  async updateOrg(@Args() updateArgs: UpdateOneOrgArgs): Promise<Org> {
    //Type coercion is required here because there is a bug in typescript
    //where entities with several relations overflow the stack

    const { data, where } = updateArgs;
    return this.orgService.updateOrg(
      where as Prisma.OrgWhereUniqueInput,
      data as Prisma.OrgUpdateInput
    );
  }

  @Mutation(() => Org, { name: 'deleteOrg', nullable: true })
  async delete(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<Org | null> {
    return this.orgService.deleteOrg(orgWhereUniqueInput);
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
