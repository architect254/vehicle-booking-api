import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';

import { UserService } from 'src/core/user/user.service';
import { Vehicle } from './vehicle.entity';
import { User } from 'src/core/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, User])],
  providers: [VehicleService, UserService],
  controllers: [VehicleController],
})
export class VehicleModule {}
