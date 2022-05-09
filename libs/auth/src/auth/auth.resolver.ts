import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Tokens } from './dtos/tokens.entity';
import { LoginUserInput, RefreshLoginInput } from './dtos/login.input';
import { Query } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { Public } from './decorator/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Tokens)
  @Public()
  @UseGuards(LocalAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput
  ): Promise<Tokens> {
    return this.authService.login(loginUserInput);
  }

  @Public()
  @Mutation(() => Tokens)
  async refreshTokens(
    @Args('refreshLoginInput') refreshLoginInput: RefreshLoginInput
  ): Promise<Tokens> {
    Logger.log('refreshToken', 'auth resolver');
    return this.authService.refreshTokens(refreshLoginInput);
  }

  @Public()
  @Query(() => Boolean)
  async usernameOrEmailExists(
    @Args('usernameOrEmail') usernameOrEmail: string
  ): Promise<boolean> {
    return !!(await this.authService.getUserByEmailOrUsername(usernameOrEmail));
  }
}
