import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokensGQL } from '@odst/types';
import { LoginUserInput, SignupUserInput } from '@odst/types';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.authGuard.ts';
import { RefreshTokenAuthGuard } from './guards/refreshToken.authGuard';
import { GetCurrentUserId } from '@odst/types';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => TokensGQL)
  @UseGuards(LocalAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput
  ): Promise<TokensGQL> {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => TokensGQL)
  async signup(
    @Args('signupUserInput') signupUserInput: SignupUserInput
  ): Promise<TokensGQL> {
    return this.authService.signup(signupUserInput);
  }

  @Mutation(() => TokensGQL)
  @UseGuards(RefreshTokenAuthGuard)
  async refresh(
    @GetCurrentUserId() userId: string,
    @Args('refreshToken') refreshToken: string
  ): Promise<TokensGQL> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
