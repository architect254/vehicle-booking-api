import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';

import { VehicleService } from './vehicle.service';

import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UpdateVehicleDto } from './dtos/update-vehicle.dto';

import { User } from '../../core/user/user.entity';
import { GetUser } from 'src/core/user/get-user.decorator';
import { Vehicle } from './vehicle.entity';

@Controller('vehicles')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Post()
  async create(
    @Body()
    payload: CreateVehicleDto,
    @GetUser() user: User,
  ): Promise<Vehicle> {
    return this.vehicleService.create(payload, user);
  }

  @Get()
  async getAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.vehicleService.readAll(page, pageSize);
  }

  @Get(':id')
  async get(@Param('id') userId: string) {
    return this.vehicleService.read(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateVehicleDto,
    @GetUser() user: User,
  ) {
    return this.vehicleService.update(id, payload, user);
  }

  @Delete(':id')
  async drop(@Param('id') id: string) {
    return this.vehicleService.drop(id);
  }
}
