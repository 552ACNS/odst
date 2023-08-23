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

  //TODO write tests for this
  // Add interceptors/manual restrictor
  @Query(() => [User], { name: 'findManyUsers' })
  async findMany(@Args() findManyUserArgs: FindManyUserArgs): Promise<User[]> {
    return this.userService.findMany(findManyUserArgs);
  }

  //TODO [ODST-302] write custom pipe to not need separate route for this
  @Public()
  @Query(() => [String])
  async getCommanders(): Promise<string[]> {
    return (
      await this.userService.findMany({
        where: {
          role: Role.CC,
        },
        select: {
          grade: true,
          firstName: true,
          lastName: true,
          status: true,
        },
        orderBy: {
          grade: 'desc',
        },
      })
    ).map(
      ({ grade, firstName, lastName }) => `${grade} ${lastName}, ${firstName}`
    );
  }

  //TODO write tests for this
  //TODO make sure anon users can't create enabled user
  @Public()
  @Mutation(() => String, { name: 'createUser' })
  async create(
    @Args('userCreateInput') userCreateInput: UserCreateInput
  ): Promise<string> {
    return (await this.userService.create(userCreateInput)).id;
  }

  //TODO write tests for this
  @Mutation(() => User, { name: 'enableAccount' })
  async enableAccount(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput
  ): Promise<User> {
    return this.userService.enableAccount(userWhereUniqueInput);
  }

  //TODO write tests for this
  @Mutation(() => User, { name: 'deleteUser', nullable: true })
  async delete(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput
  ): Promise<User | null> {
    return this.userService.delete(userWhereUniqueInput);
  }

  @ResolveField(() => [Org])
  async orgs(@Parent() user: User): Promise<Org[] | null> {
    return this.userService.orgs({ id: user.id });
  }

  @Query(() => User)
  async me(@GetCurrentUser() user: User): Promise<User> {
    return user;
  }

  //TODO write tests for this
  @Query(() => [User], { name: 'findManyAccountRequests' })
  async findManyAccountRequests(
    @GetCurrentUser() user: User
  ): Promise<Partial<User>[]> {
    return this.userService.findManyRequestedAccounts(user);
  }
}
