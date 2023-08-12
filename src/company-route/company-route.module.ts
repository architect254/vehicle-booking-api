import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyRouteService } from './company-route.service';
import { CompanyRoute } from './company-route.entity';
import { CompanyRouteController } from './company-route.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRoute])],
  controllers: [CompanyRouteController],
  providers: [CompanyRouteService],
})
export class CompanyRouteModule {}
