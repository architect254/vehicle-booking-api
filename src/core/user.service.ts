import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare, hash, genSalt } from 'bcrypt';

import { User } from '../shared/user/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(
    details: User,
    currentUser: User,
  ): Promise<string> {
    const user = new User();

    Object.assign(user, details);

    user.createdBy = currentUser;
    user.updatedBy = currentUser;

    const password = `user_password`;
    user.salt = await genSalt();
    user.password = await hash(password, user.salt);

    await this.save(user);

    return `User ${user.name} created`;
  }

  async read(id): Promise<User> {
    const user = await this.userRepo
      .createQueryBuilder('user')
      .where('user.id =:id', { id })
      .leftJoinAndSelect('user.createdBy', 'createdBy')
      .leftJoinAndSelect('user.updatedBy', 'updatedBy')
      .getOne();

    if (!user || !Object.keys(user).length) {
      const errorMessage = `User:${id} not found`;
      throw new NotFoundException(errorMessage);
    }

    return user;
  }

  async readAll(page: number, pageSize: number): Promise<User[]> {
    const skip: number = pageSize * (page - 1);

    return await this.userRepo.find({
      skip: 10,
      take: pageSize,
    });
  }

  async update(id, details: Partial<User>, currentUser: User): Promise<string> {
    const user: User = await this.read(id);

    Object.assign(user, details);
    user.updatedBy = currentUser;

    await this.userRepo.save(user);

    return `User ${user.name} updated`;
  }

  async drop(id): Promise<string> {
    const user: User = await this.read(id);
    const deletedUser = await this.userRepo.remove(user);

    if (!deletedUser) {
      const errorMessage = `Failed to delete user:${user.id}`;
      throw new InternalServerErrorException(errorMessage);
    } else return `User ${deletedUser.name} deleted`;
  }

  async save(user: User): Promise<User> {
    try {
      return await this.userRepo.save(user);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException(`User ${user.name} already exists`);
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
