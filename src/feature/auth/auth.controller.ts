import { Controller, UnauthorizedException, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';

import { SignInCredentialsDto } from './dtos/sign-in.dto';
import { SignUpCredentialsDto } from './dtos/sign-up.dto';

import { JwtPayload } from '../../shared/jwt.payload';
import { User } from '../../shared/user/user.entity';


@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/sign-up')
  async signUp(
    @Body()
    payload: SignUpCredentialsDto,
  ): Promise<User> {
    return this.authService.signUp(payload);
  }

  @Post('/sign-in')
  async signIn(
    @Body()
    payload: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user:User = await this.authService.signIn(payload);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    delete user.pin && delete user.salt;
    const userPayload: JwtPayload = { user };
    const accessToken = await this.jwtService.sign(userPayload);

    return { accessToken };
  }
}
