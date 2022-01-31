import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { RefreshTokenService } from '../refreshToken/refreshToken.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RefreshTokenService,
    PrismaService,
  ],
  exports: [],
})
export class AuthModule {}
