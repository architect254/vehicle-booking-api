import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { User } from '../core/user/user.entity';
import { Exclude } from 'class-transformer';

export default abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  dateCreated?: Date;

  @Exclude()
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  createdBy: User;

  @Column({ nullable: true })
  createdById: string;

  @UpdateDateColumn()
  dateUpdated?: Date;

  @Exclude()
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  updatedBy: User;

  @Column({ nullable: true })
  updatedById: string;
}
