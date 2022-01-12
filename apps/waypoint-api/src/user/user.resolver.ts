import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  UserCreateInput,
  UserUpdateInput,
  UserGQL,
  UserWhereUniqueInput,
} from '@odst/types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGUard } from '../auth/jwt.auth-guard';

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
  @UseGuards(JwtAuthGUard)
  async create(
    @Args('userCreateInput') userCreateInput: UserCreateInput
  ): Promise<UserGQL> {
    return await this.userService.create(userCreateInput);
  }

  // find all users
  @Query(() => [UserGQL], { name: 'findManyUsers' })
  @UseGuards(JwtAuthGUard)
  async findMany(@Context() context): Promise<UserGQL[]> {
    return this.userService.findMany();
  }

  @Query(() => UserGQL, { name: 'findUniqueUser' })
  @UseGuards(JwtAuthGUard)
  async findUnique(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput
  ) {
    return this.userService.findUnique(userWhereUniqueInput);
  }

  @Mutation(() => UserGQL, { name: 'updateUser' })
  @UseGuards(JwtAuthGUard)
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
  @UseGuards(JwtAuthGUard)
  async delete(
    @Args('userWhereUniqueInput')
    userWhereUniqueInput: UserWhereUniqueInput
  ): Promise<UserGQL> {
    return this.userService.delete(userWhereUniqueInput);
  }
}
