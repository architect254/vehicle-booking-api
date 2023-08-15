import { Entity, Column, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../shared/base-entity';
import { Vehicle } from '../vehicle/vehicle.entity';

@Entity()
export class Route extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  order: number;

  @Column()
  cost: number;

  @Column()
  bookedSeats: number;

  @Column({ type: `timestamp` })
  arrivalTime: Date;

  @Column({ type: `timestamp` })
  departureTime: Date;

  @ManyToOne(()=> Vehicle,{nullable:false})
  vehicle: Vehicle;
}
