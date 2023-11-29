import { IsEnum, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../user.role';

export class GetUsersDto extends CreateUserDto {
  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  surname: string;

  @IsOptional()
  @IsPhoneNumber(`KE`)
  phoneNo: string;

  @IsOptional()
  @IsEnum(type => UserRole)
  role: UserRole;

  @IsNumber({maxDecimalPlaces:0, allowNaN:false, allowInfinity: false})
  page: number;

  @IsNumber({maxDecimalPlaces:0, allowNaN:false, allowInfinity: false})
  pageSize: number
}
