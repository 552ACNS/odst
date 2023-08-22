import {
  Args,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  FindManyUserArgs,
  User,
} from '@odst/types/corps';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'findManyUsers' })
  async findMany(@Args() findManyUserArgs: FindManyUserArgs): Promise<User[]> {
    return this.userService.findMany(findManyUserArgs);
  }
}
