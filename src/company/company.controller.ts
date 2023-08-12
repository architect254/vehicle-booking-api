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
import { CompanyService } from './company.service';

import { CreateCompanyDto } from './create-company.dto';
import { UpdateCompanyDto } from './update-company.dto';
import { User } from '../user/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('companies')
export class CompanyController {
  constructor(private companyServcie: CompanyService) {}

  @Post()
  async createCompany(
    @Body() payload: CreateCompanyDto,
    @GetUser() currentUser: User,
  ) {
    return await this.companyServcie.create(payload, currentUser);
  }

  @Get('/:id')
  async getCompany(@Param('id') id) {
    return await this.companyServcie.read(id);
  }

  @Get()
  async getAllCompanies(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.companyServcie.readAll(page, pageSize);
  }

  @Put('/:id')
  async updateCompany(
    @Param('id') id,
    @Body() payload: UpdateCompanyDto,
    @GetUser() currentUser: User,
  ) {
    return await this.companyServcie.update(id, payload, currentUser);
  }

  @Delete('/:id')
  async deleteCompany(@Param('id') id) {
    return await this.companyServcie.drop(id);
  }
}
