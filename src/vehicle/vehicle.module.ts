import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.entity';
import { VehicleController } from './vehicle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
