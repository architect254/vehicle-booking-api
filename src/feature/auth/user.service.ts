import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { compare, hash, genSalt } from 'bcrypt';

import { User } from '../../core/user/user.entity';

import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(payload: CreateUserDto, createdById): Promise<User> {
    const { firstname, surname, phoneNo} = payload;
    const createdBy: User = await this.read(createdById);
    const user = new User(firstname, surname, phoneNo, createdBy);

    await user.encrypt();
    await user.hashPassword(`password@1234`);

    return await this.save(user);
  }

  async readAll(page: number, pageSize: number): Promise<User[]> {
    const skip: number = pageSize * (page - 1);
    return await this.userRepo.find({ skip, take: pageSize });
  }

  async update(id, payload: UpdateUserDto, updatedById): Promise<User> {
    const { firstname, surname, phoneNo } = payload;
    const updatedBy = await this.read(updatedById);
    const user: User = await this.read(id);

    user.firstname = firstname || user.firstname;
    user.surname = surname || user.surname;
    user.phoneNo = phoneNo || user.phoneNo;
    user.updatedBy = updatedBy;

    return await this.save(user);
  }

  async drop(id): Promise<any> {
    const user: User = await this.read(id);
    const result = await this.userRepo.remove(user);

    if (!result) {
      const errorMessage = `failed to delete user:${user.id}`;
      throw new InternalServerErrorException(errorMessage);
    }

    return id;
  }

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
}
