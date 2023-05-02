import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { EnumCustomerType } from '../../../common/helpers';
import { DeliverySlip } from '../../delivery-slip/entities/delivery-slip.entity';

@Entity('customers')
export class Customer extends AquavitaEntity {
  @Column()
  name: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: EnumCustomerType,
  })
  type: EnumCustomerType;

  @Column({ nullable: true })
  carboys_per_week: string;

  @OneToMany(() => DeliverySlip, (delivery_slip) => delivery_slip.customer)
  @JoinColumn()
  delivery_slips: DeliverySlip[];
}
