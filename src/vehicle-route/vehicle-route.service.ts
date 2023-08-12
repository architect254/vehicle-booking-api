import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VehicleRoute } from './vehicle-route.entity';
import { CreateVehicleRouteDto } from './create-vehicle-route.dto';
import { UpdateVehicleRouteDto } from './update-vehicle-route.dto';
import { User } from '../user/user.entity';

@Injectable()
export class VehicleRouteService {
  constructor(
    @InjectRepository(VehicleRoute)
    private vehicleRouteRepo: Repository<VehicleRoute>,
  ) {}

  async create(
    payload: CreateVehicleRouteDto,
    currentUser: User,
  ): Promise<string> {
    const vehicleRoute = new VehicleRoute();

    Object.assign(vehicleRoute, payload);

    vehicleRoute.createdBy = currentUser;
    vehicleRoute.updatedBy = currentUser;

    await this.save(vehicleRoute);

    return `Vehicle Route ${vehicleRoute.name} created`;
  }

  async read(id): Promise<VehicleRoute> {
    const vehicleRoute = await this.vehicleRouteRepo
      .createQueryBuilder('vehicleRoute')
      .where('vehicleRoute.id =:id', { id })
      .leftJoinAndSelect('vehicleRoute.createdBy', 'createdBy')
      .leftJoinAndSelect('vehicleRoute.updatedBy', 'updatedBy')
      .getOne();

    if (!vehicleRoute || !Object.keys(vehicleRoute).length) {
      const errorMessage = `Vehicle Route:${id} not found`;
      throw new NotFoundException(errorMessage);
    }

    return vehicleRoute;
  }

  async readAll(page: number, pageSize: number): Promise<VehicleRoute[]> {
    const skip: number = pageSize * (page - 1);

    return await this.vehicleRouteRepo.find({ skip, take: pageSize });
  }

  async update(
    id,
    payload: UpdateVehicleRouteDto,
    currentUser: User,
  ): Promise<string> {
    const vehicleRoute: VehicleRoute = await this.read(id);

    Object.assign(vehicleRoute, payload);
    vehicleRoute.updatedBy = currentUser;

    await this.vehicleRouteRepo.save(vehicleRoute);

    return `Vehicle Route ${vehicleRoute.name} updated`;
  }

  async drop(id): Promise<string> {
    const vehicleRoute: VehicleRoute = await this.read(id);
    const deletedVehicleRoute = await this.vehicleRouteRepo.remove(
      vehicleRoute,
    );

    if (!deletedVehicleRoute) {
      const errorMessage = `Failed to delete vehicle:${vehicleRoute.name}`;
      throw new InternalServerErrorException(errorMessage);
    }

    return `Vehicle Route ${deletedVehicleRoute.name} deleted`;
  }

  async save(vehicleRoute: VehicleRoute): Promise<VehicleRoute> {
    try {
      return await this.vehicleRouteRepo.save(vehicleRoute);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException(
          `Vehicle Route ${vehicleRoute.name} already exists`,
        );
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
