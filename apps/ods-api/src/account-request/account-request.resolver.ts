import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GetCurrentUser } from '@odst/shared/nest';
import {
  AccountRequestCreateInput,
  AccountRequestGQL,
  AccountRequestWhereUniqueInput,
  OrgGQL,
  UserGQL,
} from '@odst/types/ods';
import { AccountRequestService } from './account-request.service';
import { Public } from '@odst/auth';

@Resolver(() => AccountRequestGQL)
export class AccountRequestResolver {
  constructor(private readonly accountRequestService: AccountRequestService) {}

  @Query(() => [AccountRequestGQL], { name: 'findManyAccountRequests' })
  async findMany(
    @GetCurrentUser() user: UserGQL
  ): Promise<AccountRequestGQL[]> {
    return this.accountRequestService.findMany({
      where: {
        AND: {
          denied: false,
          orgs: {
            some: {
              users: {
                some: {
                  id: user.id,
                },
              },
            },
          },
        },
      },
    });
  }

  @Mutation(() => UserGQL, { name: 'approveAccountRequest' })
  approveRequest(
    @Args('accountRequestWhereUniqueInput')
    accountRequestWhereUniqueInput: AccountRequestWhereUniqueInput,
    @GetCurrentUser() approver: UserGQL
  ): Promise<UserGQL | null> {
    return this.accountRequestService.approveRequest(
      accountRequestWhereUniqueInput,
      approver
    );
  }

  @Mutation(() => AccountRequestGQL, { name: 'declineAccountRequest' })
  declineRequest(
    @Args('accountRequestWhereUniqueInput')
    accountRequestWhereUniqueInput: AccountRequestWhereUniqueInput
  ): Promise<AccountRequestGQL> {
    return this.accountRequestService.declineRequest(
      accountRequestWhereUniqueInput
    );
  }

  @Public()
  @Mutation(() => AccountRequestGQL, { name: 'createAccountRequest' })
  create(
    @Args('accountRequestCreateInput')
    accountRequestCreateInput: AccountRequestCreateInput
  ): Promise<AccountRequestGQL> {
    return this.accountRequestService.create(accountRequestCreateInput);
  }

  @ResolveField(() => UserGQL, { nullable: true })
  async approver(
    @Parent() accountRequest: AccountRequestGQL
  ): Promise<UserGQL | null> {
    return this.accountRequestService.approver({ id: accountRequest.id });
  }

  @ResolveField(() => [OrgGQL])
  async orgs(@Parent() accountRequest: AccountRequestGQL): Promise<OrgGQL[]> {
    return this.accountRequestService.orgs({ id: accountRequest.id });
  }
}
