import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDateString, IsInt } from 'class-validator';

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