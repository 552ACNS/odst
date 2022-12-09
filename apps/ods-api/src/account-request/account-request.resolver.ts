import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Mutation,
} from '@nestjs/graphql';
import { AccountRequestService } from './account-request.service';
import {
  AccountRequest,
  AccountRequestWhereUniqueInput,
  Comment,
  UpdateOneAccountRequestArgs,
} from '@odst/types/ods';
import { Prisma } from '.prisma/ods/client';

@Resolver(() => AccountRequest)
export class AccountRequestResolver {
  constructor(private readonly accountRequestService: AccountRequestService) {}

  @Query(() => AccountRequest, { name: 'findUniqueAccountRequest' })
  async findUnique(
    @Args('accountRequestWhereUniqueInput')
    accountRequestWhereUniqueInput: AccountRequestWhereUniqueInput
  ): Promise<AccountRequest | null> {
    return this.accountRequestService.findUnique(
      accountRequestWhereUniqueInput
    );
  }

  @Mutation(() => AccountRequest, { name: 'updateAccountRequest' })
  async update(
    @Args()
    updateArgs: UpdateOneAccountRequestArgs
  ): Promise<AccountRequest> {
    const { data, where } = updateArgs;

    return this.accountRequestService.update(
      data as Prisma.AccountRequestUpdateInput,
      where as Prisma.AccountRequestWhereUniqueInput
    );
  }

  @ResolveField(() => [Comment])
  async comments(
    @Parent() accountRequest: AccountRequest
  ): Promise<Comment[] | null> {
    return this.accountRequestService.comments({
      userId: accountRequest.userId,
    });
  }
}
