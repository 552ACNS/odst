import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Module } from '@nestjs/common';

import { AUTH_OPTIONS, AUTH_SECRET, USER_SERVICE } from './auth.constants';
import { AuthModuleOptions } from './interfaces/auth.interface';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [AuthResolver, AuthService, LocalStrategy, JWTStrategy],
})
export class AuthModule extends createConfigurableDynamicRootModule<
  AuthModule,
  AuthModuleOptions
>(AUTH_OPTIONS, {
  providers: [
    {
      provide: AUTH_SECRET,
      inject: [AUTH_OPTIONS],
      useFactory: (options: AuthModuleOptions) => options.secret,
    },
    {
      provide: USER_SERVICE,
      inject: [AUTH_OPTIONS],
      useFactory: (options: AuthModuleOptions) => options.userService,
    },
  ],
}) {}
