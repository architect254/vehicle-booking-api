import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { compare, hash, genSalt } from 'bcrypt';

import { User } from '../../shared/user/user.entity';

import { SignUpCredentialsDto } from './dtos/sign-up.dto';
import { SignInCredentialsDto } from './dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async signUp(credentials: SignUpCredentialsDto): Promise<User> {
    const { password, email, name, role } = credentials;

    const user = new User();
    user.name = name;
    user.email = email;
    user.role = role;
    user.salt = await genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      return await this.userRepo.save(user);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('User exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async signIn(credentials: SignInCredentialsDto) {
    const { email, password } = credentials;
    const user = await this.userRepo.findOne({where:{email}});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isValid = await compare(password, user.password);

    if (!isValid) {
      return null;
    }
    return user;
  }

  async hashPassword(input: string, salt: string): Promise<string> {
    return hash(input, salt);
  }
}
