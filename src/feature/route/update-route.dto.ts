import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class UpdateRouteDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  arrivalTime: Date;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  departureTime: Date;
}
