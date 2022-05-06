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
  User,
  Org,
  Role,
  UserCreateInput,
  UserWhereUniqueInput,
} from '../__types__/';
import { Public } from '@odst/auth';
import { GetCurrentUser } from '@odst/shared/nest';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Refactor this to include Cater's Where command when we implement it
  // @Query(() => [User], { name: 'findManyUsers' })

  // async findManyInOrg() {
  //   return this.userService.findMany({});
  // }

  @Query(() => [User])
  async findUsersWithRole(@Args('role') role: Role): Promise<User[]> {
    return this.userService.findMany({
      where: {
        role: role,
      },
    });
  }

  //TODO write custom pipe to not need separate route for this
  @Public()
  @Query(() => [User])
  async getCommanders(): Promise<User[]> {
    return this.userService.findMany({
      where: {
        role: Role.CC,
      },
    });
  }

  @Public()
  @Mutation(() => User, { name: 'createUser' })
  create(
    @Args('userCreateInput') userCreateInput: UserCreateInput
  ): Promise<User> {
    return this.userService.create(userCreateInput);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  async delete(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput
  ): Promise<User> {
    return this.userService.delete(userWhereUniqueInput);
  }

  @ResolveField(() => [Org])
  async orgs(@Parent() user: User): Promise<Org[]> {
    return this.userService.orgs({ id: user.id });
  }

  @Query(() => User)
  async me(@GetCurrentUser() user: User): Promise<User> {
    return user;
  }
}
