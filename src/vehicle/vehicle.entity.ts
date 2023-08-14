import { Entity, Column, ManyToOne } from 'typeorm';

import { AbstractEntity } from 'src/shared/base-entity';
import { Provider } from 'src/provider/provider.entity';


@Entity()
export class Vehicle extends AbstractEntity {
  @Column({ unique: true })
  plateNumber: string;

  @Column()
  type: string;

  @Column()
  capacity: number;

  @ManyToOne(()=> Provider,{nullable:false})
  provider: Provider;
}
