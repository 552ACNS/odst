import { Resolver, Parent, ResolveField, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { OrgGQL, UserGQL, UserWhereInput } from '@odst/types/ods';
//import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

// fix this when we have a better solution
// eslint-disable-next-line no-restricted-imports
import { Role } from '.prisma/ods/client';

@Resolver(() => UserGQL)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserGQL], { name: 'findManyUsers' })
  async findManyInOrg(
    @Args('where', { nullable: true }) where: UserWhereInput
  ) {
    return this.userService.findMany({ where });
  }

  @Query(() => [UserGQL], { name: 'findUsersWithRole' })
  async findUsersWithRole(@Args('role') role: Role): Promise<UserGQL[]> {
    return this.userService.findUsersWithRole(role);
  }

  @ResolveField(() => [OrgGQL])
  async orgs(@Parent() user: UserGQL) {
    return this.userService.orgs({ id: user.id });
  }
}
