import {
  Entity,
  Column,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { AbstractEntity } from 'src/shared/base-entity';

export enum UserRole {
  SYSTEM = 'System',
  ADMIN = 'Admin',
  AGENT = 'Agent',
  BASIC = 'Basic',
}

@Entity('users')
export class User extends AbstractEntity {
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
  password: string;

  @Exclude()
  @Column()
  salt: string;
}
