import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordResetService {
  constructor(private mailer: MailerService) {}

  async sendConfirmationLetter(to: string, from: string): Promise<void> {
    try {
      await this.mailer.sendMail({
        to: to, //to will be the users email we get from the fe
        from: from, // will be whatever we decide the email for our aapplication will be
        subject: 'Password Reset',
        text: 'This will be the url for resetting the password',
      });
    } catch (e) {
      console.log(e);
    }
  }
}
