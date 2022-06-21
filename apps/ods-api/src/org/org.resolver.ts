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
  OrgWhereUniqueInput,
  User,
  Feedback,
  UpdateOneOrgArgs,
} from '@odst/types/ods';
import { Public } from '@odst/auth';
import { Prisma } from '.prisma/ods/client';

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

  @Query(() => [Org], { name: 'getSubOrgs' })
  //TODO [ODST-299] redo getAllChildren with findMany
  async getAllChildren(
    @Args('orgWhereUniqueInput')
    orgWhereUniqueInput: OrgWhereUniqueInput
  ): Promise<Org[]> {
    return this.orgService.getAllChildren(orgWhereUniqueInput);
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
    @Args()
    updateArgs: UpdateOneOrgArgs
  ): Promise<Org> {
    const { data, where } = updateArgs;

    return this.orgService.update(
      data as Prisma.OrgUpdateInput,
      where as Prisma.OrgWhereUniqueInput
    );
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

  @ResolveField(() => [Feedback])
  async feedbacks(@Parent() org: Org): Promise<Feedback[]> {
    return this.orgService.feedbacks({ id: org.id });
  }
}
