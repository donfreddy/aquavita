import { Entity, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { EnumCustomerType } from '../../../common/helpers';
import { Company } from './company.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Contract } from '../../contract/entities/contract.entity';
import { DeliverySite } from '../../delivery-site/entities/delivery-site.entity';
import { Contact } from './contact.entity';
import { Address } from './address.entity';

@Entity('customers')
export class Customer extends AquavitaEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({
    type: 'enum',
    enum: EnumCustomerType,
  })
  type: EnumCustomerType;

  @Column()
  typology: string;

  @Column({ default: false })
  is_blocked: boolean;

  @Column({ default: false })
  has_contract: boolean;

  @Column({ nullable: true })
  blocking_reason: string;

  @Column({ nullable: true })
  blocking_date: Date;

  @Column({ nullable: true })
  unblocking_date: Date;

  @Column({ nullable: true })
  blocking_employee: string;

  @OneToOne(() => Contract, contract => contract.customer, { eager: true })
  @JoinColumn()
  contract: Contract;

  @OneToOne(() => Company, company => company.customer, { eager: true })
  @JoinColumn()
  company: Company;

  @OneToOne(() => Contact, contact => contact.customer, { eager: true })
  @JoinColumn()
  contact: Contact;

  @OneToOne(() => Address, address => address.customer, { eager: true })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];

  @OneToMany(() => DeliverySite, (deliverySite) => deliverySite.customer)
  delivery_sites: DeliverySite[];
}
