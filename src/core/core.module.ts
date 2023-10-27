import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { HttpErrorFilter } from './http-error.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { AuthModule } from './auth/auth.module';


@Module({
  imports:[
    AuthModule
  ]  ,
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports:[AuthModule]
})
export class CoreModule {}
