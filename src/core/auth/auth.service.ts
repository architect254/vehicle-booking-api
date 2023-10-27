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

import { SignUpCredentialsDto } from './dtos/sign-up.dto';
import { SignInCredentialsDto } from './dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async signUp(credentials: SignUpCredentialsDto): Promise<User> {
    const { pin, username, role } = credentials;

    const user = new User();
    user.username = username;
    user.role = role;
    user.salt = await genSalt();
    user.pin = await this.hashPassword(pin, user.salt);

    try {
       await this.userRepo.save(user);
       return
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException('Failed! User exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async signIn(credentials: SignInCredentialsDto) {
    const { username, pin } = credentials;
    const user = await this.userRepo.findOne({where:{username}});
    if (!user) {
      throw new NotFoundException('Failed! User not found');
    }
    const isValid = await compare(pin, user.pin);

    if (!isValid) {
      return null;
    }
    return user;
  }

  async hashPassword(input: string, salt: string): Promise<string> {
    return hash(input, salt);
  }
}
