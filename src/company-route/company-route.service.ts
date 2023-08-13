import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CompanyRoute } from './company-route.entity';
import { CreateCompanyRouteDto } from './create-company-route.dto';
import { UpdateCompanyRouteDto } from './update-company-route.dto';
import { User } from '../user/user.entity';

@Injectable()
export class CompanyRouteService {
  constructor(
    @InjectRepository(CompanyRoute)
    private companyRouteRepo: Repository<CompanyRoute>,
  ) {}

  async create(
    payload: CreateCompanyRouteDto,
    currentUser: User,
  ): Promise<string> {
    const companyRoute = new CompanyRoute();

    Object.assign(companyRoute, payload);

    companyRoute.createdBy = currentUser;
    companyRoute.updatedBy = currentUser;

    await this.save(companyRoute);

    return `Company Route ${companyRoute.name} created`;
  }

  async read(id): Promise<CompanyRoute> {
    const companyRoute = await this.companyRouteRepo
      .createQueryBuilder('companyRoute')
      .where('companyRoute.id =:id', { id })
      .leftJoinAndSelect('companyRoute.createdBy', 'createdBy')
      .leftJoinAndSelect('companyRoute.updatedBy', 'updatedBy')
      .getOne();

    if (!companyRoute || !Object.keys(companyRoute).length) {
      const errorMessage = `Company Route:${id} not found`;
      throw new NotFoundException(errorMessage);
    }

    return companyRoute;
  }

  async readAll(page: number, pageSize: number): Promise<CompanyRoute[]> {
    const skip: number = pageSize * (page - 1);

    return await this.companyRouteRepo.find({ skip: 10, take: pageSize });
  }

  async update(
    id,
    payload: UpdateCompanyRouteDto,
    currentUser: User,
  ): Promise<string> {
    const companyRoute: CompanyRoute = await this.read(id);

    Object.assign(companyRoute, payload);
    companyRoute.updatedBy = currentUser;

    await this.companyRouteRepo.save(companyRoute);

    return `Company Route ${companyRoute.name} updated`;
  }

  async drop(id): Promise<string> {
    const companyRoute: CompanyRoute = await this.read(id);
    const deletedCompanyRoute = await this.companyRouteRepo.remove(
      companyRoute,
    );

    if (!deletedCompanyRoute) {
      const errorMessage = `Failed to delete route:${companyRoute.name}`;
      throw new InternalServerErrorException(errorMessage);
    }

    return `Company Route ${deletedCompanyRoute.name} deleted`;
  }

  async save(companyRoute: CompanyRoute): Promise<CompanyRoute> {
    try {
      return await this.companyRouteRepo.save(companyRoute);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException(
          `Company Route ${companyRoute.name} already exists`,
        );
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
