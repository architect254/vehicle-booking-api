import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Column, OneToOne } from "typeorm";

import { User } from "./user/user.entity";

export default abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @CreateDateColumn()
  dateCreated?: Date;

  @UpdateDateColumn()
  dateUpdated?: Date;
}
