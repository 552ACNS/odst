import { Controller, Post, Query } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly mailService: PasswordResetService) {}

  @Post('send')
  async sendEmail(@Query('email') email, @Query('name') name) {
    return this.mailService.sendConfirmationLetter(email, name);
  }
}
