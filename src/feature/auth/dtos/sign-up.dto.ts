import { SignInCredentialsDto } from './sign-in.dto';
import { IsNotEmpty, IsString, IsEmail, IsDate, IsEnum } from 'class-validator';

import { UserRole } from 'src/shared/user.role';

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
