import { Entity, Column } from 'typeorm';

import { AbstractEntity } from '../../shared/base-entity';

@Entity()
export class Agent extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;
}
