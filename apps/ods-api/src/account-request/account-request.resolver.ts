import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUser } from '@odst/shared/nest';
import {
  AccountRequestCreateInput,
  AccountRequestGQL,
  AnswerWhereUniqueInput,
  UserGQL,
} from '@odst/types/ods';
import { AccountRequestService } from './account-request.service';

@Resolver(() => AccountRequestGQL)
export class AccountRequestResolver {
  constructor(private readonly accountRequestService: AccountRequestService) {}

  @Query(() => [AccountRequestGQL], { name: 'findManyAccountRequests' })
  async findMany(
    @GetCurrentUser() user: UserGQL
  ): Promise<AccountRequestGQL[]> {
    return this.accountRequestService.findMany({
      where: { orgs: { some: { users: { some: { id: user.id } } } } },
    });
  }

  @Mutation(() => UserGQL)
  approve(
    answerWhereUniqueInput: AnswerWhereUniqueInput,
    @GetCurrentUser() approver: UserGQL
  ): Promise<UserGQL | null> {
    return this.accountRequestService.approve(answerWhereUniqueInput, approver);
  }

  @Mutation(() => AccountRequestGQL, { name: 'createAccountRequest' })
  create(
    @Args('accountRequestCreateInput')
    accountRequestCreateInput: AccountRequestCreateInput
  ): Promise<AccountRequestGQL> {
    return this.accountRequestService.create(accountRequestCreateInput);
  }
}
