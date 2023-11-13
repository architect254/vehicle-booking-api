import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignInCredentialsDto {
  @IsNotEmpty()
  @IsString()
  phoneNo: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
