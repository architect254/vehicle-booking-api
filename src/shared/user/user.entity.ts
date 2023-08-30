import {
  Entity,
  Column,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import AbstractEntity from '../base-entity';

import { UserRole } from './user.role';

@Entity('users')
export class User  extends AbstractEntity{  
  @Column({ unique: true })
  username: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.LENDEE,
  })
  role: UserRole;

  @Exclude()
  @Column()
  salt: string;

  @Exclude()
  @Column()
  pin: string;
}
