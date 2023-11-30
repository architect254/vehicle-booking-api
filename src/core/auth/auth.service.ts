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
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private userService: UserService
  ) {}

 async createAdmin(credentials: SignUpCredentialsDto){
  const {password} = credentials;

    let user = new User();

    user = Object.assign(user,credentials);

    user.role = UserRole.ADMIN;
    await user.encrypt()
    await user.hashPassword(password);

    try {
      return await this.userRepo.save(user);
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException('Failed! User exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async createUser(credentials:SignUpCredentialsDto){
    const {password} = credentials;

    let user = new User();

    user = Object.assign(user,credentials);
    
    user.role = UserRole.BOOKING_MANAGER;
    await user.encrypt()
    await user.hashPassword(password);

    try {
      return await this.userRepo.save(user);
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException('Failed! User exists');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async signUp(credentials: SignUpCredentialsDto): Promise<User> {

    const users = await this.userService.readAll(1,1);
    if (!users.length) {
      return await this.createAdmin(credentials);
    }
    else {
      return await this.createUser(credentials)
    }
  }

  async signIn(credentials: SignInCredentialsDto) {
    const { phone_number, password } = credentials;
    const user = await this.userRepo.findOne({where:[{phone_number}]});
    if (!user) {
      throw new NotFoundException('Failed! User not found');
    }
    const isValid = await compare(password, user.password);

    if (!isValid) {
      return null;
    }
    return user;
  }


  async resetPassword(credentials: ResetPasswordDto){
    const { phone_number, password, newPassword} = credentials;
    const user = await this.userRepo.findOne({where:[{phone_number}]});
    if (!user) {
      throw new NotFoundException('Failed! User not found');
    }
    
    await user.encrypt()
    await user.hashPassword(newPassword);

   try {
    await this.userRepo.save(user);
 } catch (error) {
     throw new InternalServerErrorException(error.message);
 }

  }
}
