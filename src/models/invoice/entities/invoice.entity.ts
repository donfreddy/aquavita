import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, DeleteDateColumn,
} from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import {
  EnumConsumptionType,
  EnumInvoiceMostOrHave,
  EnumInvoiceStatus,
  EnumInvoiceType, EnumPaymentMethod, EnumProductType,
} from '../../../common/helpers';
import { Exclude } from 'class-transformer';
import { DeliverySlip } from '../../deliverer-activity/entities/delivery-slip.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: EnumInvoiceType,
  })
  type: EnumInvoiceType;

  @Column({
    type: 'enum',
    enum: EnumConsumptionType,
    default: EnumConsumptionType.MONTHLY,
  })
  consumption_type: EnumConsumptionType;

  @Column({ nullable: true })
  month: string;

  @Column({ nullable: true })
  year: string;

  @Column({ default: false})
  apply_tva: boolean;

  @Column({ nullable: true })
  amount_in_letters: string;

  @Column({
    type: 'enum',
    enum: EnumInvoiceMostOrHave,
  })
  most_or_have: EnumInvoiceMostOrHave;

  @Column({
    type: 'enum',
    enum: EnumProductType,
  })
  product_type: EnumProductType;

  @Column({
    type: 'enum',
    enum: EnumInvoiceStatus,
    default: EnumInvoiceStatus.UNPAID,
  })
  status: EnumInvoiceStatus;

  @Column({ default: false })
  is_archived: boolean;

  @Column({ type: 'simple-array', nullable: true })
  references: string[];

  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn()
  customer: Customer;

  @Column()
  settlement_date: Date;

  @Column({ nullable: true })
  settlement_reference: string;

  @Column({ nullable: true })
  bon_count_per_week: number;

  @Column({ nullable: true })
  fountain_count: number;

  @Column({ nullable: true })
  payment_date: Date;

  @Column({ nullable: true })
  amount_excluding_taxes: number;

  @Column({ nullable: true })
  amount_including_taxes: number;

  @Column({
    type: 'enum',
    enum: EnumPaymentMethod,
    nullable: true,
  })
  payment_method: EnumPaymentMethod;

  @OneToMany(() => DeliverySlip, deliverySlip => deliverySlip.deliverer_activity)
  delivery_slips: DeliverySlip[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn()
  deleted_at: Date;
}
