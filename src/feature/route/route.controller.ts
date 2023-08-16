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

import { GetUser } from '../../shared/user/get-user.decorator';
import { RouteService } from './route.service';

import { CreateRouteDto } from './create-route.dto';
import { UpdateRouteDto } from './update-route.dto';
import { User } from '../../shared/user/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('routes')
export class RouteController {
  constructor(private routeService: RouteService) {}

  @Post()
  async createRoute(
    @Body() payload: CreateRouteDto,
    @GetUser() currentUser: User,
  ) {
    return await this.routeService.create(payload, currentUser);
  }

  @Get('/:id')
  async getRoute(@Param('id') id) {
    return await this.routeService.read(id);
  }

  @Get()
  async getAllRoutes(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.routeService.readAll(page, pageSize);
  }

  @Put('/:id')
  async updateRoute(
    @Param('id') id,
    @Body() payload: UpdateRouteDto,
    @GetUser() currentUser: User,
  ) {
    return await this.routeService.update(id, payload, currentUser);
  }

  @Delete('/:id')
  async deleteRoute(@Param('id') id) {
    return await this.routeService.drop(id);
  }
}
