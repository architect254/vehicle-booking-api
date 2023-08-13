import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Company } from './company.entity';
import { CreateCompanyDto } from './create-company.dto';
import { UpdateCompanyDto } from './update-company.dto';
import { User } from '../user/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepo: Repository<Company>,
  ) {}

  async create(payload: CreateCompanyDto, currentUser: User): Promise<string> {
    const company = new Company();

    Object.assign(company, payload);

    company.createdBy = currentUser;
    company.updatedBy = currentUser;

    await this.save(company);

    return `Company ${company.name} created`;
  }

  async read(id): Promise<Company> {
    const company = await this.companyRepo
      .createQueryBuilder('company')
      .where('company.id =:id', { id })
      .leftJoinAndSelect('company.createdBy', 'createdBy')
      .leftJoinAndSelect('company.updatedBy', 'updatedBy')
      .getOne();

    if (!company || !Object.keys(company).length) {
      const errorMessage = `Company:${id} not found`;
      throw new NotFoundException(errorMessage);
    }

    return company;
  }

  async readAll(page: number, pageSize: number): Promise<Company[]> {
    const skip: number = pageSize * (page - 1);

    return await this.companyRepo.find({ skip: 10, take: pageSize });
  }

  async update(
    id,
    payload: UpdateCompanyDto,
    currentUser: User,
  ): Promise<string> {
    const company: Company = await this.read(id);

    Object.assign(company, payload);
    company.updatedBy = currentUser;

    await this.companyRepo.save(company);

    return `Company ${company.name} updated`;
  }

  async drop(id): Promise<string> {
    const company: Company = await this.read(id);
    const deletedCompany = await this.companyRepo.remove(company);

    if (!deletedCompany) {
      const errorMessage = `Failed to delete company:${company.id}`;
      throw new InternalServerErrorException(errorMessage);
    }

    return `Company ${deletedCompany.name} deleted`;
  }

  async save(company: Company): Promise<Company> {
    try {
      return await this.companyRepo.save(company);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Company already exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
