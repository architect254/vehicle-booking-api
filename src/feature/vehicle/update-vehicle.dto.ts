import {
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  plateNumber: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  capacity: string;
}
