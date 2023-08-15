import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../../shared/user.role';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

}
