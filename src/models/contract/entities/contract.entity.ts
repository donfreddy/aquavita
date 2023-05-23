import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { EnumInvoicingProfile } from '../../../common/helpers';
import { Customer } from '../../customer/entities/customer.entity';

@Entity('contracts')
export class Contract extends AquavitaEntity {
  @Column({
    type: 'enum',
    enum: EnumInvoicingProfile,
  })
  invoicing_profile: EnumInvoicingProfile;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  invoiced_amount_per_month: string;

  @Column()
  effective_date: Date;

  @Column({ default: false })
  signed_and_classified: boolean;

  @Column({ default: false })
  is_terminated: boolean;

  @Column()
  termination_date: Date;

  @Column({ nullable: true })
  termination_raison: string;

  @Column({ default:0})
  carboys_per_week: number;

  @Column({ default:0})
  placed_fountain: number;

  @OneToOne(() => Customer, customer => customer.contract)
  @JoinColumn()
  customer: Customer;

  // @OneToMany(() => DeliverySlip, (delivery_slip) => delivery_slip.customer)
  // delivery_slips: DeliverySlip[];
  //
  // @OneToMany(() => Invoice, (invoice) => invoice.customer)
  // invoices: Invoice[];
}
