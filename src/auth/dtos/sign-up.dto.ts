import { SignInCredentialsDto } from './sign-in.dto';
import { IsNotEmpty, IsString, IsEmail, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from 'src/user/user.entity';

export class SignUpCredentialsDto extends SignInCredentialsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  @IsString()
  password: string;
}
