import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Customer } from './customer.entity';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';

@Entity('addresses')
export class Address extends AquavitaEntity {

  @OneToOne(() => Customer )
  @JoinColumn()
  customer: Customer;
}
