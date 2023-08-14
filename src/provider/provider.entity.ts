import { Entity, Column } from 'typeorm';

import { AbstractEntity } from 'src/shared/base-entity';

@Entity()
export class Provider extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;
}
