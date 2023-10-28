import { IsNotEmpty, IsString, IsEmail, IsDate, IsEnum } from 'class-validator';

import { UserRole } from '../../../core/user/user.role';

import { SignInCredentialsDto } from './sign-in.dto';

export class SignUpCredentialsDto extends SignInCredentialsDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  surname: string;
  
}
