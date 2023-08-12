import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from 'src/auth/get-user.decorator';
import { VehicleService } from './vehicle.service';

import { CreateVehicleDto } from './create-vehicle.dto';
import { UpdateVehicleDto } from './update-vehicle.dto';
import { User } from '../user/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('vehicles')
export class VehicleController {
  constructor(private VehicleServcie: VehicleService) {}

  @Post()
  async createVehicle(
    @Body() payload: CreateVehicleDto,
    @GetUser() currentUser: User,
  ) {
    return await this.VehicleServcie.create(payload, currentUser);
  }

  @Get('/:id')
  async getVehicle(@Param('id') id) {
    return await this.VehicleServcie.read(id);
  }

  @Get()
  async getAllVehicles(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.VehicleServcie.readAll(page, pageSize);
  }

  @Put('/:id')
  async updateVehicle(
    @Param('id') id,
    @Body() payload: UpdateVehicleDto,
    @GetUser() currentUser: User,
  ) {
    return await this.VehicleServcie.update(id, payload, currentUser);
  }

  @Delete('/:id')
  async deleteVehicle(@Param('id') id) {
    return await this.VehicleServcie.drop(id);
  }
}
