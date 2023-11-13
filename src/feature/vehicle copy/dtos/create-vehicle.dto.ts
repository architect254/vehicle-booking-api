import { IsString, IsNotEmpty, IsNumber} from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  registrationNo: string;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsNotEmpty()
  @IsNumber()
  cost: number;
}
