import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RefreshLoginInput, TokensGQL, UserGQL } from '@odst/types/waypoint';
import { LoginUserInput, SignupUserInput } from '@odst/types/waypoint';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.authGuard';
import { RefreshTokenAuthGuard } from './guards/refreshToken.authGuard';
import { GetCurrentUser } from '@odst/shared/nest';

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
  async refreshTokens(@GetCurrentUser() user: UserGQL): Promise<TokensGQL> {
    return this.authService.refreshTokens(user);
  }

  @Mutation(() => TokensGQL)
  async refreshTokensVar(
    @Args('refreshLoginInput') refreshLoginInput: RefreshLoginInput
  ): Promise<TokensGQL> {
    return this.authService.refreshTokensVar(refreshLoginInput);
  }
}
