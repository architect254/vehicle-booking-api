import { IsNotEmpty, IsStrongPassword } from "class-validator";
import { SignInCredentialsDto } from "./sign-in.dto";

export class ResetPasswordDto extends SignInCredentialsDto {
    @IsNotEmpty()
    @IsStrongPassword()
    newPassword: string;
  }