import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { EnumDeliverySlipStatus } from '../../../common/helpers';
import { DelivererActivity } from './deliverer-activity.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';

@Entity('delivery_slips')
export class DeliverySlip extends AquavitaEntity {
  @Column()
  type: string;

  @Column()
  contract: string;

  @Column()
  delivery_address: string;

  @Column()
  carboys_delivered: string;

  @Column({ default: '0' })
  carboys_recovered_in_state: string;

  @Column({ default: '0' })
  carboys_recovered_in_broken: string;

  @Column({
    type: 'enum',
    enum: EnumDeliverySlipStatus,
    default: EnumDeliverySlipStatus.PENDING,
  })
  status: EnumDeliverySlipStatus;

  @Column()
  observation: string;

  @ManyToOne(() => Customer, { eager: true })
  customer: Customer;

  @ManyToOne(() => Invoice, (invoice) => invoice.delivery_slips)
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;

  @ManyToOne(() => DelivererActivity, (delivererActivity) => delivererActivity.delivery_slips)
  @JoinColumn({ name: 'deliverer_activity_id' })
  deliverer_activity: DelivererActivity;
}
