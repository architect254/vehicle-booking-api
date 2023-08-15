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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '../../shared/get-user.decorator';
import { ProviderService } from './provider.service';

import { CreateProviderDto } from './create-provider.dto';
import { UpdateProviderDto } from './update-provider.dto';
import { User } from '../user/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('Providers')
export class ProviderController {
  constructor(private providerService: ProviderService) {}

  @Post()
  async createProvider(
    @Body() payload: CreateProviderDto,
    @GetUser() currentUser: User,
  ) {
    return await this.providerService.create(payload, currentUser);
  }

  @Get('/:id')
  async getProvider(@Param('id') id) {
    return await this.providerService.read(id);
  }

  @Get()
  async getAllProviders(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.providerService.readAll(page, pageSize);
  }

  @Put('/:id')
  async updateProvider(
    @Param('id') id,
    @Body() payload: UpdateProviderDto,
    @GetUser() currentUser: User,
  ) {
    return await this.providerService.update(id, payload, currentUser);
  }

  @Delete('/:id')
  async deleteProvider(@Param('id') id) {
    return await this.providerService.drop(id);
  }
}
