import { Resolver, Parent, ResolveField, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { OrgGQL, UserGQL } from '@odst/types/ods';

// fix this when we have a better solution
// eslint-disable-next-line no-restricted-imports
import { Role } from '.prisma/ods/client';

@Resolver(() => UserGQL)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserGQL])
  async getCommanders(): Promise<UserGQL[]> {
    return this.userService.findMany({
      where: {
        role: Role.CC,
      },
    });
  }

  @ResolveField(() => [OrgGQL])
  async orgs(@Parent() user: UserGQL): Promise<OrgGQL[]> {
    return this.userService.orgs({ id: user.id });
  }
}
