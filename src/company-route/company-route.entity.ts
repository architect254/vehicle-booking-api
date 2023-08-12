import { Entity, Column } from 'typeorm';

import { AbstractEntity } from 'src/shared/base-entity';

@Entity()
export class CompanyRoute extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  order: number;
}
