import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayloadAccess } from '@odst/shared/nest';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { USER_SERVICE } from '../auth.constants';
import { UserService } from '../interfaces/user-service.interface';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(USER_SERVICE) private readonly userService: UserService) {
    //validates that token is signed and unexpired
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['NX_JWT_SECRET'],
    });
  }

  //callback after validation is complete
  async validate(payload: JwtPayloadAccess) {
    //this centralizes auth flow

    //TODO [ODST-304] sign tokens with user's password hash, to invalidate all tokens on password change
    // but again, this centralizes it

    //TODO [ODST-305] client fingerprint?
    //added user.status to accomodate status field in ODS
    const user = await this.userService.findUnique({ id: payload.sub });
    if (user && (user.enabled || user.status == 'ENABLED')) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
