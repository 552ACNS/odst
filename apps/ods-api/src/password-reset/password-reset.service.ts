import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PasswordResetService {
  constructor(private mailer: MailerService, private prisma: PrismaService) {}
  //remebers to put back in the from input for when we got that figured out ig
  async sendConfirmationLetter(to: string): Promise<string> {
    const uniqueUser = {
      email: to,
    };
    if (
      await this.prisma.user.findUnique({
        where: uniqueUser,
      })
    ) {
      try {
        await this.mailer.sendMail({
          to: to, //to will be the users email we get from the fe
          from: 'acnssmtp552@gmail.com', // will be whatever we decide the email for our aapplication will be
          subject: 'Password Reset',
          text: 'This will be the url for resetting the password',
        });
      } catch (e) {
        console.log(e);
      }
    }
    return 'Email has been sent';
  }
}
