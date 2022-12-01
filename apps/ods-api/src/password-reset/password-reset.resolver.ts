import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Public } from '@odst/auth';
import { User } from '@odst/types/ods';
import { PasswordResetService } from './password-reset.service';

@Resolver(() => User)
export class PasswordResetResolver {
  constructor(private readonly mailService: PasswordResetService) {}

  @Public()
  @Mutation(() => String, { name: 'resetEmail' })
  async sendEmail(@Args('userEmail') email: string): Promise<string> {
    return this.mailService.sendConfirmationLetter(email);
  }
}
