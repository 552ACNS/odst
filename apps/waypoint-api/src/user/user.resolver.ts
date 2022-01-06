import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserCreateInput, UserUpdateInput, UserGQL, UserWhereUniqueInput } from '@odst/types';


@Resolver(() => UserGQL)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // create a user
  @Mutation(() => UserGQL, { name: 'createUser' })
  async create(
    @Args('userCreateInput') userCreateInput: UserCreateInput,
  ) {
    return this.userService.create(userCreateInput);
  }

  // find all users
  @Query(() => [UserGQL], { name: 'findManyUsers' })
  async findMany() {
    return await this.userService.findMany();
  }

  @Query(() => UserGQL, { name: 'findUniqueUser' })
  async findUnique(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput,
  ) {
    return this.userService.findUnique(userWhereUniqueInput);
  }

  @Mutation(() => UserGQL, { name: 'updateUser' })
  async update(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput,
    @Args('UserUpdateInput')
    userUpdateInput: UserUpdateInput,
  ): Promise<UserGQL> {
    return this.userService.update(userWhereUniqueInput, userUpdateInput);
  }

  @Mutation(() => UserGQL, { name: 'deleteUser' })
  async delete(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput,
  ): Promise<UserGQL> {
    return this.userService.delete(userWhereUniqueInput);
  }
}
