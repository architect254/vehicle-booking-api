import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  IsOptional,
} from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  POBox: string;
}
