import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UserService } from "../user/user.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
    constructor(
        userService: UserService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
            secretOrKey: process.env.JWT_REFRESH_SECRET
        })
    }

    async validate(payload: any) {
        const  username = payload
        const user = await this.userService.findUnique({ username: username });

        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }

}
