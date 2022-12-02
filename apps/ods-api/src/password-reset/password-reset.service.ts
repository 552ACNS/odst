import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';

@Injectable()
export class PasswordResetService {
  constructor(
    private mailer: MailerService,
    private prisma: PrismaService,
    private readonly userService: UserService
  ) {}

  //remebers to put back in the from input for when we got that figured out ig
  async sendConfirmationLetter(to: string): Promise<string> {
    const resetToken = uuidv4();
    if (
      await this.prisma.user.findUnique({
        where: { email: to },
      })
    ) {
      try {
        await this.mailer.sendMail({
          to: to, //to will be the users email we get from the fe
          from: 'acnssmtp552@gmail.com', // will be whatever we decide the email for our aapplication will be
          subject: 'Password Reset',
          text: 'This will be the url for resetting the password',
        });
        this.userService.update({ email: to }, { resetToken: resetToken });
      } catch (e) {
        console.log(e);
      }
    }
    return 'Email has been sent';
  }
}
