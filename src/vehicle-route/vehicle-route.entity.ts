import { Entity, Column, ManyToOne } from 'typeorm';

import { AbstractEntity } from 'src/shared/base-entity';
import { Vehicle } from 'src/vehicle/vehicle.entity';

@Entity()
export class VehicleRoute extends AbstractEntity {
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
  provider: Vehicle;
}
