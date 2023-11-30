import { IsString, IsNotEmpty, IsEnum} from 'class-validator';
import { UserRole } from '../user.role';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEnum(type => UserRole)
  role: UserRole;
}
