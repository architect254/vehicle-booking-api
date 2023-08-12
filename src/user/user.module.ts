import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Company])],
  controllers: [UserController],
  providers: [UserService, CompanyService],
  exports: [UserService],
})
export class UserModule {}
