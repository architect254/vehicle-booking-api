import {
  Entity,
  Column,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import AbstractEntity from '../base-entity';

import { UserRole } from './user.role';

@Entity('users')
export class User  extends AbstractEntity{  
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.BASIC,
  })
  role: UserRole;

  @Exclude()
  @Column()
  salt: string;

  @Exclude()
  @Column()
  password: string;
}
