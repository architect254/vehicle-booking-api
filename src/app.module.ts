import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProviderModule } from './provider/provider.module';

import { typeOrmConfig } from './config/typeorm.config';

import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleRouteModule } from './vehicle-route/vehicle-route.module';
import { UserService } from './user/user.service';
import { UserRole } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    ProviderModule,
    VehicleModule,
    VehicleRouteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private userService: UserService,
  ) {}
  async onApplicationBootstrap() {
    const users = await this.userService.readAll(undefined, undefined);

    if (!users || users.length == 0) {
      await this.userService.create(
        {
          name: `SYSTEM`,
          email: `official.jared.bada@gmail.com`,
          role: UserRole.SYSTEM
        },
        null,
      );
    }
  }
}
