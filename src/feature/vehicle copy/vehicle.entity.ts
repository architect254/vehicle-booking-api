import { Entity, Column } from 'typeorm';

import { InternalServerErrorException } from '@nestjs/common';

import { compare, hash, genSalt } from 'bcrypt';

import AbstractEntity from '../../shared/base-entity';

import { User } from 'src/core/user/user.entity';

@Entity('VEHICLES')
export class Vehicle extends AbstractEntity {
  @Column()
  registrationNo: string;

  @Column()
  capacity: number;

  @Column()
  cost: number;

  constructor(
    registrationNo: string,
    capacity: number,
    cost: number,
    createdBy: User,
  ) {
    super();
    this.registrationNo = registrationNo;
    this.capacity = capacity;
    this.cost = cost;
    this.createdBy = createdBy;
    this.updatedBy = createdBy;
  }
}
