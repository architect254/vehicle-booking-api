import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { AbstractEntity } from 'src/shared/base-entity';
import { Company } from 'src/company/company.entity';

export enum UserRole {
  ADMIN = 'Admin',
  COMPANY_MANAGER = 'Company Manager',
  VEHICLE_MANAGER = 'Vehicle Manager',
}

@Entity('users')
export class User extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Company, { nullable: true })
  company: Company;

  @Column({ nullable: true })
  companyId: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.VEHICLE_MANAGER,
  })
  role: UserRole;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;
}
