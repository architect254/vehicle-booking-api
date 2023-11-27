import { Controller, UnauthorizedException, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';

import { SignInCredentialsDto } from './dtos/sign-in.dto';
import { SignUpCredentialsDto } from './dtos/sign-up.dto';

import { JwtPayload } from '../../shared/jwt.payload';
import { User } from '../../core/user/user.entity';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/sign-up')
  async signUp(
    @Body()
    payload: SignUpCredentialsDto,
  ): Promise<void> {
     this.authService.signUp(payload);
  }

  @Post('/sign-in')
  async signIn(
    @Body()
    payload: SignInCredentialsDto,
  ): Promise<{ token: string }> {
    const user:User = await this.authService.signIn(payload);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    delete user.password && delete user.salt;
    const userPayload: JwtPayload = { user };
    const token = await this.jwtService.sign(userPayload);

    return { token };
  }
}
