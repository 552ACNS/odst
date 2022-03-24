import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RefreshLoginInput, TokensGQL } from '@odst/types/waypoint';
import { LoginUserInput, SignupUserInput } from '@odst/types/waypoint';
import { Logger, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.authGuard';

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
  async refreshTokens(
    @Args('refreshLoginInput') refreshLoginInput: RefreshLoginInput
  ): Promise<TokensGQL> {
    const tokens = await this.authService.refreshTokens(refreshLoginInput);
    Logger.log({ tokens });
    return this.authService.refreshTokens(refreshLoginInput);
  }
}
