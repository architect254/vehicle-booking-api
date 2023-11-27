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
import { UserRole } from '../user/user.role';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private userService: UserService
  ) {}

 async createAdmin(credentials: SignUpCredentialsDto){
    const {firstname, surname, phoneNo, password } = credentials;

    const user = new User(firstname, surname,UserRole.ADMIN, phoneNo);
    
    user.salt = await genSalt();
    user.password = await this.hashPassword(password, user.salt);

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

  async signUp(credentials: SignUpCredentialsDto): Promise<void> {

    const users = await this.userService.readAll(1,1);
    if (!users) {
      this.createAdmin(credentials);
    }
  }

  async signIn(credentials: SignInCredentialsDto) {
    const { phoneNo, password } = credentials;
    const user = await this.userRepo.findOne({where:{phoneNo}});
    if (!user) {
      throw new NotFoundException('Failed! User not found');
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
