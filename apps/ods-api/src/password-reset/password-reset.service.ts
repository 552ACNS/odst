import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { Prisma } from '.prisma/ods/client';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PasswordResetService {
  constructor(
    private mailer: MailerService,
    private prisma: PrismaService,
    private readonly userService: UserService
  ) {}

  //remembers to put back in the from input for when we got that figured out ig
  async sendConfirmationLetter(to: string): Promise<string> {
    const userId = await this.prisma.user.findUnique({
      where: { email: to },
      select: { id: true },
    });

    //checks that email is valid
    if (userId) {
      try {
        const resetToken = this.create({
          user: { connect: { id: userId.id } },
        });
        await this.mailer.sendMail({
          to: to, //to will be the users email we get from the fe
          from: 'acnssmtp552@gmail.com', // will be whatever we decide the email for our aapplication will be
          subject: 'Password Reset',
          html: `
          <h3>Please click the link below to reset password</h3>
          <p><a href="http://${process.env.PASSWORD_RESET}/${
            (
              await resetToken
            ).id
          }">Reset Password</a></p>
           `,
        });
      } catch (e) {
        console.log(e);
      }
    }
    return 'Email has been sent';
  }

  async findUnique(
    resetTokenWhereUniqueInput: Prisma.ResetTokenWhereUniqueInput
  ): Promise<boolean> {
    const tokenFound = this.prisma.resetToken.findUnique({
      where: resetTokenWhereUniqueInput,
    });

    return !!(await tokenFound);
  }

  async create(data: Prisma.ResetTokenCreateInput): Promise<{
    id: string;
  }> {
    return this.prisma.resetToken.create({
      data,
      select: {
        id: true,
      },
    });
  }

  @Cron(CronExpression.EVERY_30_MINUTES, {
    name: 'Delete password resetTokens older than 30 minutes',
  })
  private async DeleteOneResetTokenArgs(): Promise<void> {
    Logger.log(
      'Deleting password ResetTokens older than 30 minutes',
      'UserService'
    );
    // TODO [ODST-272]: Redo with try catch
    //Will silently fail if delete isn't cascaded properly
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [DeleteOneResetTokenArgs] = await this.prisma.$transaction([
      this.prisma.resetToken.deleteMany({
        where: {
          issuedDate: { lt: new Date(Date.now() - 1800000) },
        },
      }),
    ]);
  }
}
