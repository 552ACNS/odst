import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class PasswordResetService {
  constructor(private mailer: MailerService) {}

  async sendConfirmationLetter(to: string, from: string): Promise<void> {
    try {
      await this.mailer.sendMail({
        to: 'to',
        from: 'from',
        subject: 'subject',
        text: 'some text',
      });
    } catch (e) {
      console.log(e);
    }
  }
}
