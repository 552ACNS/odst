import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  UserCreateInput,
  UserUpdateInput,
  UserGQL,
  UserWhereUniqueInput,
} from '@odst/types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.auth-guard';

@Resolver(() => UserGQL)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Mutation(() => AuthPayloadGQL)
  // async signup(parent, args, context, info) {
  //   // 1
  //   const password = await hash(args.password, 10)

  //   // 2
  //   const user = await this.userService.create({ data: { ...args, password } })

  //   // 3
  //   const token = jwt.sign({ userId: user.id }, APP_SECRET)

  //   // 4
  //   return {
  //     token,
  //     user,
  //   }
  //}

  // create a user
  //ths uses the guard because to make an account while unauthenticated you use the signup mutation
  @Mutation(() => UserGQL, { name: 'createUser' })
  @UseGuards(JwtAuthGuard)
  async create(
    @Args('userCreateInput') userCreateInput: UserCreateInput
  ): Promise<UserGQL> {
    return await this.userService.create(userCreateInput);
  }

  // find all users
  @Query(() => [UserGQL], { name: 'findManyUsers' })
  @UseGuards(JwtAuthGuard)
  async findMany(): Promise<UserGQL[]> {
    return this.userService.findMany();
  }

  @Query(() => UserGQL, { name: 'findUniqueUser' })
  @UseGuards(JwtAuthGuard)
  async findUnique(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput
  ) {
    return this.userService.findUnique(userWhereUniqueInput);
  }

  @Mutation(() => UserGQL, { name: 'updateUser' })
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async delete(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput
  ): Promise<UserGQL> {
    return this.userService.delete(userWhereUniqueInput);
  }
}
