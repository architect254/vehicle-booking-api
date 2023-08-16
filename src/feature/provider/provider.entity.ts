import { Entity, Column, ManyToOne } from 'typeorm';

import AbstractEntity  from '../../shared/base-entity';
import { Agent } from '../../feature/agent/agent.entity';

@Entity()
export class Provider extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @ManyToOne(()=> Agent,{nullable:false})
  provider: Agent;
}
