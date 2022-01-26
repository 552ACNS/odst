import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginResponse, LoginUserInput, SignupUserInput } from '@odst/types';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    passwordPlaintextInput: string
  ): Promise<unknown> {

    const user = await this.userService.findUnique({ username: username });
    if (user && user.enabled) {
      //first is plaintext, second is hash to compare it to
      const valid = await compare(passwordPlaintextInput, user.password);

      if (valid) {
        // Do we need to destructure the password?
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(loginInput: LoginUserInput) : Promise<LoginResponse>{
    const user = await this.userService.findUnique({
      username: loginInput.username,
    });

    if (user) {
      const { password, ...result } = user;
      return {
        token: this.jwtService.sign({ username: user.username, sub: user.id }),
        user,
      };
    }
    throw new UnauthorizedException();
  }

  async signup(signupUserInput: SignupUserInput) {
    //hash plaintext password input
    const password = await hash(signupUserInput.password, 10);

    //if user exists, database will throw unique error
    return this.userService.create({
      ...signupUserInput,
      password,
      person: signupUserInput.person,
    });
  }
}
