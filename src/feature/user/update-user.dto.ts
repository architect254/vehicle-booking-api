import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../../shared/user.role';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;
}
