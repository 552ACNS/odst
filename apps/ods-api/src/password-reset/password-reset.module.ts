import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST, // change to your email smtp server like www.example.com
        port: process.env.EMAIL_PORT, // change to configured tls port for smtp server
        secure: true,
        auth: {
          user: process.env.EMAIL_ID, // change to the users email
          pass: process.env.EMAIL_PASS, // will authenticate that this is a valid user email
        },
      },
    }),
  ],
})
export class MailModule {}
