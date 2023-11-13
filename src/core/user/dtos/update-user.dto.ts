import { IsNotEmpty, IsString, IsEmail, IsDate, IsEnum, IsOptional } from 'class-validator';

import { UserRole } from '../user.role';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @IsOptional()
  firstname: string;

  @IsOptional()
  surname: string;

  @IsOptional()
  phoneNo: string;
}
