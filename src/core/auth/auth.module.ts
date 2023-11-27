import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';


import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from '../../core/user/user.entity';

import * as config from 'config';
import { UserModule } from '../user/user.module';


const jwtConfig = config.get('jwt');
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    UserModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
