import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Tokens } from './dtos/tokens.entity';
import {
  LoginUserInput,
  RefreshLoginInput,
  SignupUserInput,
} from './dtos/login.input';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { GetCurrentUser } from '@odst/shared/nest';
import { User } from './interfaces/user-service.interface';
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

  @Mutation(() => Tokens)
  @Public()
  async signup(
    @Args('signupUserInput') signupUserInput: SignupUserInput
  ): Promise<Tokens> {
    return this.authService.signup(signupUserInput);
  }

  @Mutation(() => Tokens)
  async refreshTokens(
    @Args('refreshLoginInput') refreshLoginInput: RefreshLoginInput,
    @GetCurrentUser() user: User
  ): Promise<Tokens> {
    return this.authService.refreshTokens(refreshLoginInput, user);
  }
}
