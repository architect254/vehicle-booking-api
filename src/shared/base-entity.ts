import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Column, OneToOne } from "typeorm";

import { User } from "./user/user.entity";

// Handle Audit
export default abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: number;

  @CreateDateColumn()
  dateCreated?: Date;

  @UpdateDateColumn()
  dateUpdated?: Date;

  @OneToOne(() => User,(user: User)=>user.id, { nullable: true , cascade: true, 
    onDelete: "CASCADE"})
  @JoinColumn()
  createdBy?: User;

  @Column({ nullable: true })
  createdById: string;

  @OneToOne(() => User,(user: User)=>user.id, { nullable: true , cascade: true, 
    onDelete: "CASCADE"})
  @JoinColumn()
  updatedBy?: User;

  @Column({ nullable: true })
  updatedById: string;

}
