import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDateString, IsInt } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  cost: number;

  @IsDateString()
  @IsNotEmpty()
  arrivalTime: Date;

  @IsDateString()
  @IsNotEmpty()
  departureTime: Date;
}
