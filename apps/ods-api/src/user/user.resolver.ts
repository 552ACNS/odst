import { Resolver, Args, Query, Parent, ResolveField } from '@nestjs/graphql';
import { UserService } from './user.service';
import { OrgGQL, UserGQL, UserWhereInput } from '@odst/types/ods';
import { OrgService } from '../org/org.service';
//import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

@Resolver(() => UserGQL)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly orgService: OrgService) {}

  // find all users
  @Query(() => [UserGQL], { name: 'findManyUsers' })
  // @UseGuards(AccessTokenAuthGuard)
  async findMany(
    @Args('where', { nullable: true }) where: UserWhereInput
  ) {
    return this.userService.findMany({ where });
  }

  @ResolveField(() => [OrgGQL], { name: 'orgs' })
  async orgs(@Parent() user: UserGQL) {
    return (await this.orgService.findMany({
        where: { users: { some: { id: user.id } } },
    }))
  }
}
