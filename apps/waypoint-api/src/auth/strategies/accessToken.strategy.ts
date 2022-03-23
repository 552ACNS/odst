import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayloadAccess } from '@odst/types/waypoint';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'accessToken'
) {
  constructor(private userService: UserService) {
    //validates that token is signed and unexpired
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.NX_JWT_SECRET,
    });
  }

  //callback after validation is complete
  async validate(payload: JwtPayloadAccess) {
    const username = payload.username;
    //this centralizes auth flow

    //TODO sign tokens with user's password hash, to invalidate all tokens on password change
    // but again, this centralizes it

    //TODO client fingerprint?
    const user = await this.userService.findUnique({ username: username });
    if (user && user.enabled) {
      return payload;
    } else {
      throw new UnauthorizedException();
    }
  }
}
