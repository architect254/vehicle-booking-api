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
import { CompanyRouteService } from './company-route.service';

import { CreateCompanyRouteDto } from './create-company-route.dto';
import { UpdateCompanyRouteDto } from './update-company-route.dto';
import { User } from '../user/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('company-routes')
export class CompanyRouteController {
  constructor(private companyRouteServcie: CompanyRouteService) {}

  @Post()
  async createVehicleRoute(
    @Body() payload: CreateCompanyRouteDto,
    @GetUser() currentUser: User,
  ) {
    return await this.companyRouteServcie.create(payload, currentUser);
  }

  @Get('/:id')
  async getVehicleRoute(@Param('id') id) {
    return await this.companyRouteServcie.read(id);
  }

  @Get()
  async getAllVehicleRoutes(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.companyRouteServcie.readAll(page, pageSize);
  }

  @Put('/:id')
  async updateVehicleRoute(
    @Param('id') id,
    @Body() payload: UpdateCompanyRouteDto,
    @GetUser() currentUser: User,
  ) {
    return await this.companyRouteServcie.update(id, payload, currentUser);
  }

  @Delete('/:id')
  async deleteVehicleRoute(@Param('id') id) {
    return await this.companyRouteServcie.drop(id);
  }
}
