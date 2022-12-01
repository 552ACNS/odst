import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetResolver } from './password-reset.resolver';
import { MailerModule } from '@nestjs-modules/mailer';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  exports: [PasswordResetService],
  providers: [PasswordResetResolver, PasswordResetService, PrismaService],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
    }),
  ],
})
export class PasswordResetModule {}
