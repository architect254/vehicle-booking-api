import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { VehicleRoute } from 'src/vehicle-route/vehicle-route.entity';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  plateNumber: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  capacity: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehicleRoute)
  authParameters: VehicleRoute[];
}
