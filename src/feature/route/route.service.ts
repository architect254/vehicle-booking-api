import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Route } from './route.entity';
import { CreateRouteDto } from './create-route.dto';
import { UpdateRouteDto } from './update-route.dto';
import { User } from '../../shared/user/user.entity';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private routeRepo: Repository<Route>,
  ) {}

  async create(
    payload: CreateRouteDto,
    currentUser: User,
  ): Promise<string> {
    const route = new Route();

    Object.assign(route, payload);

    route.createdBy = currentUser;
    route.updatedBy = currentUser;

    await this.save(route);

    return `Route ${route.name} created`;
  }

  async read(id): Promise<Route> {
    const route = await this.routeRepo
      .createQueryBuilder('route')
      .where('route.id =:id', { id })
      .leftJoinAndSelect('route.createdBy', 'createdBy')
      .leftJoinAndSelect('route.updatedBy', 'updatedBy')
      .getOne();

    if (!route || !Object.keys(route).length) {
      const errorMessage = ` Route:${id} not found`;
      throw new NotFoundException(errorMessage);
    }

    return route;
  }

  async readAll(page: number, pageSize: number): Promise<Route[]> {
    const skip: number = pageSize * (page - 1);

    return await this.routeRepo.find({ skip: 10, take: pageSize });
  }

  async update(
    id,
    payload: UpdateRouteDto,
    currentUser: User,
  ): Promise<string> {
    const route: Route = await this.read(id);

    Object.assign(route, payload);
    route.updatedBy = currentUser;

    await this.routeRepo.save(route);

    return `Route ${route.name} updated`;
  }

  async drop(id): Promise<string> {
    const route: Route = await this.read(id);
    const deletedRoute = await this.routeRepo.remove(
      route,
    );

    if (!deletedRoute) {
      const errorMessage = `Failed to delete :${route.name}`;
      throw new InternalServerErrorException(errorMessage);
    }

    return `Route ${deletedRoute.name} deleted`;
  }

  async save(route: Route): Promise<Route> {
    try {
      return await this.routeRepo.save(route);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException(
          `Route ${route.name} already exists`,
        );
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
