import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleRouteService } from './vehicle-route.service';
import { VehicleRoute } from './vehicle-route.entity';
import { VehicleRouteController } from './vehicle-route.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleRoute])],
  controllers: [VehicleRouteController],
  providers: [VehicleRouteService],
})
export class VehicleRouteModule {}
