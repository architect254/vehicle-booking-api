import { IsString, IsNotEmpty } from 'class-validator';

export class SignInCredentialsDto {
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
