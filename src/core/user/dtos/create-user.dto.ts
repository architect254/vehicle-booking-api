import { IsString, IsNotEmpty, IsEnum} from 'class-validator';
import { UserRole } from '../user.role';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  phoneNo: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  surname: string;

  @IsNotEmpty()
  @IsEnum(type => UserRole)
  role: UserRole;
}
