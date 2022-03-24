import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  UserCreateInput,
  UserUpdateInput,
  UserGQL,
  UserWhereUniqueInput,
} from '@odst/types/waypoint';
import { UseGuards } from '@nestjs/common';
import { AccessTokenAuthGuard } from '../auth/guards/accessToken.authGuard';

@Resolver(() => UserGQL)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // find all users
  @Query(() => [UserGQL], { name: 'findManyUsers' })
  @UseGuards(AccessTokenAuthGuard)
  async findMany(): Promise<UserGQL[]> {
    return this.userService.findMany({});
  }

  @Query(() => UserGQL, { name: 'findUniqueUser' })
  @UseGuards(AccessTokenAuthGuard)
  async findUnique(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput
  ) {
    return this.userService.findUnique(userWhereUniqueInput);
  }

  // create a user
  // ths uses the guard because to make an account while unauthenticated you use the signup mutation
  // password provided must be the hashed password for user to be able to log in
  @Mutation(() => UserGQL, { name: 'createUser' })
  @UseGuards(AccessTokenAuthGuard)
  async create(
    @Args('userCreateInput') userCreateInput: UserCreateInput
  ): Promise<UserGQL> {
    return await this.userService.create(userCreateInput);
  }

  @Mutation(() => UserGQL, { name: 'updateUser' })
  @UseGuards(AccessTokenAuthGuard)
  async update(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput,
    @Args('UserUpdateInput')
    userUpdateInput: UserUpdateInput
  ): Promise<UserGQL> {
    return (await this.userService.update(
      userWhereUniqueInput,
      userUpdateInput
    )) as UserGQL;
  }

  @Mutation(() => UserGQL, { name: 'deleteUser' })
  @UseGuards(AccessTokenAuthGuard)
  async delete(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput
  ): Promise<{ deleted: boolean }> {
    return this.userService.delete(userWhereUniqueInput);
  }
}
