import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { OrgService } from './org.service';
import { Org, User, Feedback } from '@odst/types/ods';
import { Public } from '@odst/auth';

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
