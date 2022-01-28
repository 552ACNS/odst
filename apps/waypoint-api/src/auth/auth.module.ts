import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { RefreshTokenService } from './refreshToken.service'
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenResolver } from './refreshToken.resolver';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      //TODO implement refresh tokens
      signOptions: {
        expiresIn: process.env.NODE_ENV === 'production' ? '15m' : '5d',
      },
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy, JwtRefreshStrategy, RefreshTokenResolver, RefreshTokenService, PrismaService],
  exports: [],
})
export class AuthModule {}
