import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { EnumCustomerType } from '../../../common/helpers';
import { DeliverySlip } from '../../deliverer-activity/entities/delivery-slip.entity';
import { Address } from './address.entity';

@Entity('customers')
export class Customer extends AquavitaEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  code: string;

  @Column({ default: '411200' })
  client_code: string

  @Column({
    type: 'enum',
    enum: EnumCustomerType,
  })
  type: EnumCustomerType;

  @Column({ nullable: true })
  carboys_per_week: string;

  @OneToMany(() => Address, (address) => address.customer)
  @JoinColumn()
  addresses: Address[];

  @OneToMany(() => DeliverySlip, (delivery_slip) => delivery_slip.customer)
  @JoinColumn()
  delivery_slips: DeliverySlip[];
}
