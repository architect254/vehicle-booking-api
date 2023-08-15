import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Provider } from './provider.entity';
import { CreateProviderDto } from './create-provider.dto';
import { UpdateProviderDto } from './update-provider.dto';
import { User } from '../user/user.entity';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providerRepo: Repository<Provider>,
  ) {}

  async create(payload: CreateProviderDto, currentUser: User): Promise<string> {
    const provider = new Provider();

    Object.assign(provider, payload);

    provider.createdBy = currentUser;
    provider.updatedBy = currentUser;

    await this.save(provider);

    return `Provider ${provider.name} created`;
  }

  async read(id): Promise<Provider> {
    const provider = await this.providerRepo
      .createQueryBuilder('provider')
      .where('provider.id =:id', { id })
      .leftJoinAndSelect('provider.createdBy', 'createdBy')
      .leftJoinAndSelect('provider.updatedBy', 'updatedBy')
      .getOne();

    if (!provider || !Object.keys(provider).length) {
      const errorMessage = `Provider:${id} not found`;
      throw new NotFoundException(errorMessage);
    }

    return provider;
  }

  async readAll(page: number, pageSize: number): Promise<Provider[]> {
    const skip: number = pageSize * (page - 1);

    return await this.providerRepo.find({ skip: 10, take: pageSize });
  }

  async update(
    id,
    payload: UpdateProviderDto,
    currentUser: User,
  ): Promise<string> {
    const provider: Provider = await this.read(id);

    Object.assign(provider, payload);
    provider.updatedBy = currentUser;

    await this.providerRepo.save(provider);

    return `Provider ${provider.name} updated successfuly`;
  }

  async drop(id): Promise<string> {
    const provider: Provider = await this.read(id);
    const deletedProvider = await this.providerRepo.remove(provider);

    if (!deletedProvider) {
      const errorMessage = `Failed to delete provider:${deletedProvider.id}`;
      throw new InternalServerErrorException(errorMessage);
    }

    return `Provider ${deletedProvider.name} deleted successfuly`;
  }

  async save(provider: Provider): Promise<Provider> {
    try {
      return await this.providerRepo.save(provider);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Provider already exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
