import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from '../shared/config/typeorm.config';


import * as config from 'config';

import { HttpErrorFilter } from './http-error.filter';
import { JwtStrategy } from './jwt.strategy';
import { LoggingInterceptor } from './logging.interceptor';

import { User } from '../shared/user/user.entity';
import { UserService } from './user.service';

const jwtConfig = config.get('jwt');


@Module({
    imports:[
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: process.env.JWT_SECRET || jwtConfig.secret,
        signOptions: {
          expiresIn: jwtConfig.expiresIn,
        },
      }),
      TypeOrmModule.forRoot(typeOrmConfig),
      TypeOrmModule.forFeature([User])
    ],
    providers: [
      {
        provide: APP_FILTER,
        useClass: HttpErrorFilter,
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
      },
      JwtStrategy,
      UserService
    ],
      exports: [PassportModule, UserService ]
})
export class CoreModule {}
