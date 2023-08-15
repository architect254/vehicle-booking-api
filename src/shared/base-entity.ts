import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Column } from "typeorm";

import { User } from "../feature/user/user.entity";

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @CreateDateColumn()
  dateCreated?: Date;

  @UpdateDateColumn()
  dateUpdated?: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  createdBy: User;

  @Column({ nullable: true })
  createdById: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn()
  updatedBy: User;

  @Column({ nullable: true })
  updatedById: string;

}
