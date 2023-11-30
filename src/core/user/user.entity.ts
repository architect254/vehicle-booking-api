import { Entity, Column } from 'typeorm';

import { compare, hash, genSalt } from 'bcrypt';

import { Exclude } from 'class-transformer';

import AbstractEntity from '../../shared/base-entity';

import { UserRole } from './user.role';

import { InternalServerErrorException } from '@nestjs/common';

@Entity('USERS')
export class User extends AbstractEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  phone_number: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole[UserRole.BOOKING_MANAGER]  ,
  })
  role: UserRole;

  @Exclude()
  @Column({nullable: true})
  salt: string;

  @Exclude()
  @Column({nullable: true})
  password: string;

  constructor(
  ) {
    super();
  }

  public encrypt() {
    return this.genSalt().then((salt) => {
      this.salt = salt;
    });
  }

  hashPassword(password: string) {
    return this.hash(password, this.salt)
      .then((hash: string) => {
        this.password = hash;
      })
      .catch((error) => {
        throw new InternalServerErrorException(error);
      });
  }

  async validatePassword(password) {
    return await this.compare(password, this.password);
  }

  genSalt(): Promise<string> {
    return genSalt();
  }

  hash(input: string, salt: string): Promise<string> {
    return hash(input, salt);
  }

  compare(input: string, salt: string): Promise<boolean> {
    return compare(input, salt);
  }
}
