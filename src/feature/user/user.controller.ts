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

import { diskStorage } from 'multer';
import * as path from 'path';

import { UserService } from './user.service';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { GetUser } from '../../shared/get-user.decorator';

// let storage = {
//   storage: diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join(__dirname, '../../uploads'));
//     },
//     filename: (req, file, cb) => {
//       let fileExt = path.extname(file.originalname);
//       cb(null, 'user-' + Date.now() + fileExt);
//     },
//   }),
// };

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post()
  async createUser(
    @Body() payload: CreateUserDto,
    @GetUser() currentUser: User,
  ) {
    return await this.userService.create(payload, currentUser);
  }

  @Get('/:id')
  async getUser(@Param('id') id) {
    return await this.userService.read(id);
  }

  @Get()
  async getAllUsers(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.userService.readAll(page, pageSize);
  }

  @Put('/:id')
  async updateUser(
    @Param('id') id,
    @Body() payload: UpdateUserDto,
    @GetUser() currentUser: User,
  ) {
    return await this.userService.update(id, payload, currentUser);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id) {
    return await this.userService.drop(id);
  }
}
