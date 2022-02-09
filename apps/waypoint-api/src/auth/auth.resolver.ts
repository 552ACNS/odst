import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { TokensGQL } from '@odst/types';
import { LoginUserInput, SignupUserInput } from '@odst/types';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.authGuard';
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
  async refreshTokens(@GetCurrentUserId() userId: string): Promise<TokensGQL> {
    return this.authService.refreshTokens(userId);
  }

  @Mutation(() => TokensGQL)
  async refreshTokensVar(@Args('refreshToken') refreshToken : string): Promise<TokensGQL> {
    const tokens = await this.authService.refreshTokensVar(refreshToken);
    Logger.log({tokens})
    return this.authService.refreshTokensVar(refreshToken);
  }
}
