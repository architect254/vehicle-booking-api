import { Entity, Column } from 'typeorm';

import { AbstractEntity } from 'src/shared/base-entity';

@Entity()
export class Vehicle extends AbstractEntity {
  @Column({ unique: true })
  plateNumber: string;

  @Column()
  type: string;

  @Column()
  capacity: number;
}
