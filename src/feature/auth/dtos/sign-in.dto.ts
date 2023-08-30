import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignInCredentialsDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  pin: string;
}
