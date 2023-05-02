import { Entity, Column, ManyToOne } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { User } from '../../user/entities/user.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { EnumDeliverySlipStatus } from '../../../common/helpers';

@Entity('delivery_slips')
export class DeliverySlip extends AquavitaEntity {
  @Column()
  designation: string;

  @Column()
  qty_delivered: string;

  @Column({ default: '0' })
  qty_recovered_in_state: string;

  @Column({ default: '0' })
  qty_recovered_in_broken: string;

  @Column()
  po_number: string;

  @Column({
    type: 'enum',
    enum: EnumDeliverySlipStatus,
    default: EnumDeliverySlipStatus.PENDING,
  })
  status: EnumDeliverySlipStatus;

  // @OneToOne(() => PurchaseOrder, { eager: true })
  // purchase_order: PurchaseOrder;

  @ManyToOne(() => Customer, { eager: true })
  customer: Customer;

  @Column()
  delivery_date: Date;

  @ManyToOne(() => User, { eager: true })
  deliverer: User;
}
