import {
  Resolver,
  Parent,
  ResolveField,
  Query,
  Args,
  Mutation,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  CommentGQL,
  OrgGQL,
  UserCreateInput,
  UserGQL,
  UserWhereUniqueInput,
} from '@odst/types/ods';

// fix this when we have a better solution
// eslint-disable-next-line no-restricted-imports
import { Role } from '.prisma/ods/client';
import { Public } from '@odst/auth';
import { GetCurrentUser } from '@odst/shared/nest';

@Resolver(() => UserGQL)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Refactor this to include Cater's Where command when we implement it
  // @Query(() => [UserGQL], { name: 'findManyUsers' })

  // async findManyInOrg() {
  //   return this.userService.findMany({});
  // }

  @Query(() => [UserGQL])
  async findUsersWithRole(@Args('role') role: Role): Promise<UserGQL[]> {
    return this.userService.findMany({
      where: {
        role: role,
      },
    });
  }

  //TODO write custom pipe to not need separate route for this
  @Public()
  @Query(() => [UserGQL])
  async getCommanders(): Promise<UserGQL[]> {
    return this.userService.findMany({
      where: {
        role: Role.CC,
      },
    });
  }

  @ResolveField(() => [CommentGQL])
  async comments(@Parent() user: UserGQL): Promise<CommentGQL[]> {
    return this.userService.comments({ id: user.id });
  }

  @Query(() => UserGQL, { name: 'findUniqueUser' })
  async findUnique(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput
  ): Promise<UserGQL | null> {
    return this.userService.findUnique(userWhereUniqueInput);
  }

  @ResolveField(() => [OrgGQL])
  async orgs(@Parent() user: UserGQL): Promise<OrgGQL[]> {
    return this.userService.orgs({ id: user.id });
  }

  @Query(() => UserGQL)
  async me(@GetCurrentUser() user: UserGQL): Promise<UserGQL> {
    return user;
  }
  @Public()
  @Mutation(() => UserGQL, { name: 'createUser' })
  create(
    @Args('userCreateInput') userCreateInput: UserCreateInput
  ): Promise<UserGQL> {
    return this.userService.create(userCreateInput);
  }

  @Mutation(() => UserGQL, { name: 'deleteUser', nullable: true })
  async delete(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput
  ): Promise<UserGQL | null> {
    return this.userService.delete(userWhereUniqueInput);
  }
}
