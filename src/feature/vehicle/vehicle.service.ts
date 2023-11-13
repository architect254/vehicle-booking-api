import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../core/user/user.entity';

import { UpdateVehicleDto } from './dtos/update-vehicle.dto';
import { CreateVehicleDto } from './dtos/create-vehicle.dto';
import { UserService } from 'src/core/user/user.service';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>,
   private userService: UserService
  ) {}

  async read(id): Promise<Vehicle> {
    const vehicle = await this.vehicleRepo
      .createQueryBuilder('vehicle')
      .where('vehicle.id =:id', { id })
      .leftJoinAndSelect('vehicle.createdBy', 'createdBy')
      .leftJoinAndSelect('vehicle.updatedBy', 'updatedBy')
      .getOne();

    if (!vehicle || !Object.keys(vehicle).length) {
      const errorMessage = `vehicle:${id} not found`;
      throw new NotFoundException(errorMessage);
    }

    return vehicle;
  }

  async save(vehicle: Vehicle): Promise<Vehicle> {
    try {
      return await this.vehicleRepo.save(vehicle);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('vehicle already exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async create({ registrationNo, capacity, cost}: CreateVehicleDto, createdById): Promise<Vehicle> {

    const createdByUser = await this.userService.read(createdById);
    const vehicle = new Vehicle(registrationNo, capacity, cost);

    return await this.save(vehicle);
  }

  async readAll(page: number, pageSize: number): Promise<Vehicle[]> {
    const skip: number = pageSize * (page - 1);
    return await this.vehicleRepo.find({ skip, take: pageSize });
  }

  async update(id, {registrationNo, capacity, cost}: UpdateVehicleDto, updatedById): Promise<Vehicle> {
    const vehicle: Vehicle = await this.read(id);

    vehicle.registrationNo = registrationNo || vehicle.registrationNo;
    vehicle.capacity = capacity || vehicle.capacity;
    vehicle.cost = cost || vehicle.cost;

    return await this.save(vehicle);
  }

  async drop(id): Promise<void> {
    const vehicle: Vehicle = await this.read(id);
    const deleted = await this.vehicleRepo.remove(vehicle);

    if (!deleted) {
      const errorMessage = `failed to delete vehicle:${vehicle.id}`;
      throw new InternalServerErrorException(errorMessage);
    }
  }

}
