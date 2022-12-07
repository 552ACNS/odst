import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';
import { Prisma, ResetToken } from '.prisma/ods/client';

@Injectable()
export class PasswordResetService {
  constructor(
    private mailer: MailerService,
    private prisma: PrismaService,
    private readonly userService: UserService
  ) {}

  //remembers to put back in the from input for when we got that figured out ig
  async sendConfirmationLetter(to: string): Promise<string> {
    const hash: string = uuidv4();
    const resetToken: any = {
      hash,
      CurrentDate: Date.now(),
    };

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
          html: `
          <h3>Please click the link below to reset password</h3>
          <p>localhost:4210/password-reset/${hash}</p>
           `,
        });
        this.userService.update({ email: to }, { resetToken: resetToken });
      } catch (e) {
        console.log(e);
      }
    }
    return 'Email has been sent';
  }

  async findUnique(
    resetTokenWhereUniqueInput: Prisma.ResetTokenWhereUniqueInput
  ): Promise<boolean> {
    return !!this.prisma.resetToken.findUnique({
      where: resetTokenWhereUniqueInput,
    });
  }
}
