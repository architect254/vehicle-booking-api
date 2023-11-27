import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

import { User } from '../../core/user/user.entity';
import { GetUser } from 'src/core/user/get-user.decorator';
import { GetUsersDto } from './dtos/get-users.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(
    @Body()
    payload: CreateUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    return this.userService.create(payload, user);
  }

  @Get()
  async getAll(
    @Query() {page, pageSize}: GetUsersDto
  ) {
    return this.userService.readAll(page, pageSize);
  }

  @Get(':id')
  async get(@Param('id') userId: string) {
    return this.userService.read(userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
    @GetUser() user: User,
  ) {
    return this.userService.update(id, payload, user);
  }

  @Delete(':id')
  async drop(@Param('id') id: string) {
    return this.userService.drop(id);
  }
}
