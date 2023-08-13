import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsInt, IsArray, ValidateNested } from 'class-validator';
import { VehicleRoute } from 'src/vehicle-route/vehicle-route.entity';

export class CreateCompanyRouteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  order: number;
}

export class CreateCompanyRoutesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehicleRoute)
  authParameters: VehicleRoute[];
}