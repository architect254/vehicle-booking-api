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
import { VehicleRouteService } from './vehicle-route.service';

import { CreateVehicleRouteDto } from './create-vehicle-route.dto';
import { UpdateVehicleRouteDto } from './update-vehicle-route.dto';
import { User } from '../user/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('vehicle-routes')
export class VehicleRouteController {
  constructor(private VehicleRouteServcie: VehicleRouteService) {}

  @Post()
  async createVehicleRoute(
    @Body() payload: CreateVehicleRouteDto,
    @GetUser() currentUser: User,
  ) {
    return await this.VehicleRouteServcie.create(payload, currentUser);
  }

  @Get('/:id')
  async getVehicleRoute(@Param('id') id) {
    return await this.VehicleRouteServcie.read(id);
  }

  @Get()
  async getAllVehicleRoutes(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.VehicleRouteServcie.readAll(page, pageSize);
  }

  @Put('/:id')
  async updateVehicleRoute(
    @Param('id') id,
    @Body() payload: UpdateVehicleRouteDto,
    @GetUser() currentUser: User,
  ) {
    return await this.VehicleRouteServcie.update(id, payload, currentUser);
  }

  @Delete('/:id')
  async deleteVehicleRoute(@Param('id') id) {
    return await this.VehicleRouteServcie.drop(id);
  }
}
