import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

import { typeOrmConfig } from './config/typeorm.config';

import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleRouteModule } from './vehicle-route/vehicle-route.module';
import { UserService } from './user/user.service';
import { UserRole } from './user/user.entity';
import { CompanyService } from './company/company.service';
import { Company } from './company/company.entity';
import { CompanyRouteController } from './company-route/company-route.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    CompanyModule,
    CompanyRouteController,
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
    private companyService: CompanyService,
  ) {}
  async onApplicationBootstrap() {
    const users = await this.userService.readAll(undefined, undefined);

    if (!users || users.length == 0) {
      await this.companyService.create(
        {
          name: `SYSTEM`,
          email: `official.jared.bada@gmail.com`,
          phoneNumber: `0790101667`,
          POBox: `2406 Mombasa`,
        },
        null,
      );
      const companies: Company[] = await this.companyService.readAll(
        undefined,
        undefined,
      );

      await this.userService.create(
        {
          name: `admin`,
          email: `official.jared.bada@gmail.com`,
          role: UserRole.ADMIN,
          companyId: null,
        },
        companies[1],
        null,
      );
    }
  }
}
