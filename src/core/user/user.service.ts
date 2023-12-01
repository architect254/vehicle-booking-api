import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


import { User } from '../../core/user/user.entity';

import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async read(id): Promise<User> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.id =:id', { id })
      .leftJoinAndSelect('user.createdBy', 'createdBy')
      .leftJoinAndSelect('user.updatedBy', 'updatedBy')
      .getOne();

    if (!user || !Object.keys(user).length) {
      const errorMessage = `user:${id} not found`;
      throw new NotFoundException(errorMessage);
    }

    return user;
  }

  async save(user: User): Promise<User> {
    try {
      return await this.userRepo.save(user);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('user already exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async create(payload: CreateUserDto, createdById): Promise<User> {

    let user = new User();

    user = Object.assign(user,payload);

    await user.encrypt();
    await user.hashPassword(`password@1234`);

    return await this.save(user);
  }

  async readAll(page: number, take: number): Promise<User[]> {
    const skip: number = take * (page - 1);
    return await this.userRepo.find({ skip, take });
  }

  async update(id, payload: UpdateUserDto, updatedById): Promise<User> {
    let user: User = await this.read(id);

    user = Object.assign(user,payload);

    return await this.save(user);
  }

  async drop(id): Promise<void> {
    const user: User = await this.read(id);
    const deleted = await this.userRepo.remove(user);

    if (!deleted) {
      const errorMessage = `failed to delete user:${user.id}`;
      throw new InternalServerErrorException(errorMessage);
    }
  }

}
