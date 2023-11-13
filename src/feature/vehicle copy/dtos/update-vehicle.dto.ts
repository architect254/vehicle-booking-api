import { IsNotEmpty, IsString, IsEmail, IsDate, IsEnum, IsOptional } from 'class-validator';

import { UserRole } from '../vehicle.role';

import { CreateVehicleDto } from './create-vehicle.dto';

export class UpdateVehicleDto extends CreateVehicleDto {
  @IsOptional()
  registrationNo: string;

  @IsOptional()
  capacity: number;

  @IsOptional()
  cost: number;
}
