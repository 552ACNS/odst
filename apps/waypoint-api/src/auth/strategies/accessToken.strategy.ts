import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '@odst/types';
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
      //TODO process.env not working
      secretOrKey:
        process.env.JWT_SECRET ||
        'dM?|Y[N7WXx<P;-zSFjh)[^m|^0mpJz:qWVGpyfZ9seu-m{`-dlR|ZpP62^t(v$%',
    });
  }

  //callback after validation is complete
  async validate(payload: JwtPayload) {
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
