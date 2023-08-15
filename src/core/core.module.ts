import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { TypeOrmModule } from '@nestjs/typeorm';

import { HttpErrorFilter } from './http-error.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { JwtStrategy } from './jwt.strategy';

import * as config from 'config';
import { typeOrmConfig } from '../feature/config/typeorm.config';
import { User } from 'src/feature/user/user.entity';

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
      TypeOrmModule.forFeature([User]),
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
        JwtStrategy
      ],
      exports: [PassportModule ]
})
export class CoreModule {}
