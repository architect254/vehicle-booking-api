import { Entity, Column } from 'typeorm';

import { AbstractEntity } from 'src/shared/base-entity';

@Entity()
export class Route extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  order: number;
}
