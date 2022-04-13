import { Resolver, Query, Parent, ResolveField, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { OrgGQL, UserGQL, UserWhereInput } from '@odst/types/ods';
//import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';
// import { UseGuards } from '@nestjs/common';

@Resolver(() => UserGQL)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // find all users
  @Query(() => [UserGQL], { name: 'findManyUsers' })
  // @UseGuards(AccessTokenAuthGuard)
  async findMany(@Args('where', { nullable: true }) where: UserWhereInput) {
    return this.userService.findMany({ where });
  }

  @ResolveField(() => [OrgGQL])
  async orgs(@Parent() user: UserGQL) {
    return await this.userService.orgs({ id: user.id });
  }
}
