import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '@odst/types';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken'
) {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    //validates that token is signed and unexpired
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //TODO process.env doesn't work, fix hardcoded value
      secretOrKey:
        process.env.JWT_REFRESH_SECRET ||
        'Wk)6P&Mmb@{55VmbIt4Sj<g(M7^j(9z+/a=4Y-]r501ru_uAz:4Lpx4V:<)`FYmF',
      passReqToCallback: true,
    });
  }

  //callback after validation is complete
  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.headers['authorization']?.replace('Bearer ', '');
    //this probably is pointless, since we're in the callback
    if (!refreshToken) throw new BadRequestException();

    //TODO should this be done/happening here?
    const user = await this.userService.findUnique({
      username: payload.username,
    });
    if (!user || !user.enabled) {
      throw new UnauthorizedException();
    }

    const validToken = this.authService.validateRefreshToken(
      user.id,
      refreshToken
    );
    if (!validToken) throw new UnauthorizedException();

    return payload;
  }
}
