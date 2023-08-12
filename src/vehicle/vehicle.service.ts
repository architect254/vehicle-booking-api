import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vehicle } from './vehicle.entity';
import { CreateVehicleDto } from './create-vehicle.dto';
import { UpdateVehicleDto } from './update-vehicle.dto';
import { User } from '../user/user.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>,
  ) {}

  async create(payload: CreateVehicleDto, currentUser: User): Promise<string> {
    const vehicle = new Vehicle();

    Object.assign(vehicle, payload);

    vehicle.createdBy = currentUser;
    vehicle.updatedBy = currentUser;

    await this.save(vehicle);

    return `Vehicle ${vehicle.plateNumber} created`;
  }

  async read(id): Promise<Vehicle> {
    const vehicle = await this.vehicleRepo
      .createQueryBuilder('vehicle')
      .where('vehicle.id =:id', { id })
      .leftJoinAndSelect('vehicle.createdBy', 'createdBy')
      .leftJoinAndSelect('vehicle.updatedBy', 'updatedBy')
      .getOne();

    if (!vehicle || !Object.keys(vehicle).length) {
      const errorMessage = `Vehicle:${id} not found`;
      throw new NotFoundException(errorMessage);
    }

    return vehicle;
  }

  async readAll(page: number, pageSize: number): Promise<Vehicle[]> {
    const skip: number = pageSize * (page - 1);

    return await this.vehicleRepo.find({ skip, take: pageSize });
  }

  async update(
    id,
    payload: UpdateVehicleDto,
    currentUser: User,
  ): Promise<string> {
    const vehicle: Vehicle = await this.read(id);

    Object.assign(vehicle, payload);
    vehicle.updatedBy = currentUser;

    await this.vehicleRepo.save(vehicle);

    return `Vehicle ${vehicle.plateNumber} updated`;
  }

  async drop(id): Promise<string> {
    const vehicle: Vehicle = await this.read(id);
    const deletedVehicle = await this.vehicleRepo.remove(vehicle);

    if (!deletedVehicle) {
      const errorMessage = `Failed to delete vehicle:${vehicle.plateNumber}`;
      throw new InternalServerErrorException(errorMessage);
    }

    return `Vehicle ${deletedVehicle.plateNumber} deleted`;
  }

  async save(vehicle: Vehicle): Promise<Vehicle> {
    try {
      return await this.vehicleRepo.save(vehicle);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException(`Vehicle ${vehicle.plateNumber} already exists`);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
