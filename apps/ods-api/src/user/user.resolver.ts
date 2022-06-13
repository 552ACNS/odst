import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  FindManyUserArgs,
  Org,
  Role,
  User,
  UserCreateInput,
  UserWhereUniqueInput,
} from '@odst/types/ods';
import { Public } from '@odst/auth';
import { GetCurrentUser } from '@odst/shared/nest';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Add interceptors/manual restrictor
  @Query(() => [User], { name: 'findManyUsers' })
  async findMany(@Args() findManyUserArgs: FindManyUserArgs): Promise<User[]> {
    return this.userService.findMany(findManyUserArgs);
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

  //TODO make sure anon users can't create enabled user
  @Public()
  @Mutation(() => User, { name: 'createUser' })
  create(
    @Args('userCreateInput') userCreateInput: UserCreateInput
  ): Promise<User> {
    return this.userService.create(userCreateInput);
  }

  @Mutation(() => User, { name: 'enableAccount' })
  async enableAccount(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput
  ): Promise<User> {
    return this.userService.enableAccount(userWhereUniqueInput);
  }

  @ResolveField(() => [Org])
  async orgs(@Parent() user: User): Promise<Org[]> {
    return this.userService.orgs({ id: user.id });
  }

  @Query(() => User)
  async me(@GetCurrentUser() user: User): Promise<User> {
    return user;
  }

  @Query(() => [User], { name: 'findManyAccountRequests' })
  async findManyAccountRequests(@GetCurrentUser() user: User) {
    return this.userService.findManyRequestedAccounts(user);
  }
}
