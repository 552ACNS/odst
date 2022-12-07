import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Public } from '@odst/auth';
import { ResetToken, User } from '@odst/types/ods';
import { PasswordResetService } from './password-reset.service';

@Resolver(() => User)
export class PasswordResetResolver {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Public()
  @Mutation(() => String, { name: 'resetEmail' })
  async sendEmail(@Args('userEmail') email: string): Promise<string> {
    return this.passwordResetService.sendConfirmationLetter(email);
  }

  @Public()
  @Query(() => Boolean)
  async checkResetToken(@Args() resetToken: string): Promise<boolean> {
    return this.passwordResetService.findUnique({ id: resetToken });
  }
}
