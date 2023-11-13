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

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @Exclude()
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  createdBy: User;

  @Column({ nullable: true })
  createdById: string;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;


  @Exclude()
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  updatedBy: User;

  @Column({ nullable: true })
  updatedById: string;
}
