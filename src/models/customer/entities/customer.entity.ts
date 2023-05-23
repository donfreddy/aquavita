import { Entity, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { EnumCustomerType } from '../../../common/helpers';
import { DeliverySlip } from '../../deliverer-activity/entities/delivery-slip.entity';
import { Company } from './company.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Contract } from '../../contract/entities/contract.entity';

@Entity('customers')
export class Customer extends AquavitaEntity {
  @Column()
  name: string;

  @Column({ default: 0 })
  code: number;

  @Column({
    type: 'enum',
    enum: EnumCustomerType,
  })
  type: EnumCustomerType;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: 'Douala' })
  city: string;

  @Column({ nullable: true })
  zone: string;

  @Column({ nullable: true })
  postcode: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  fax: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  website: string;

  @Column({ default: 0 })
  fountains_count: number;

  @Column({ nullable: true })
  accounting_general_account: string;

  @Column({ nullable: true })
  accounting_third_party_account: string;

  @Column({ default: false })
  has_tva: boolean;

  @Column({ default: false })
  is_blocked: boolean;

  @Column({ nullable: true })
  blocking_reason: string;

  @Column({ nullable: true })
  blocking_date: Date;

  @Column({ nullable: true })
  blocking_employee: string;

  @Column({ nullable: true })
  blocking_last_update: Date;

  @OneToOne(() => Contract, contract => contract.customer, { eager: true })
  @JoinColumn()
  contract: Contract;

  @OneToOne(() => Company, company => company.customer, { eager: true })
  @JoinColumn()
  company: Company;

  @OneToMany(() => DeliverySlip, (delivery_slip) => delivery_slip.customer)
  delivery_slips: DeliverySlip[];

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];
}
