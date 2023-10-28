import { Entity, Column } from 'typeorm';

import { compare, hash, genSalt } from 'bcrypt';

import { Exclude } from 'class-transformer';

import AbstractEntity from '../../shared/base-entity';

import { UserRole } from './user.role';

import { InternalServerErrorException } from '@nestjs/common';

@Entity('users')
export class User extends AbstractEntity {
  @Column()
  firstname: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  phoneNo: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER  ,
  })
  role: UserRole;

  @Exclude()
  @Column()
  salt: string;

  @Exclude()
  @Column()
  password: string;

  constructor(
    firstname: string,
    surname: string,
    phoneNo: string,
    createdBy: User,
  ) {
    super();
    this.firstname = firstname;
    this.surname = surname;
    this.phoneNo = phoneNo;
    this.role = UserRole.ADMIN;
    this.dateCreated = new Date();
    this.createdBy = createdBy;
    this.dateUpdated = new Date();
    this.updatedBy = createdBy;
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
