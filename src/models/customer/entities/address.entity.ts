import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { DeliverySite } from '../../delivery-site/entities/delivery-site.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: 'Douala' })
  city: string;

  @Column({ nullable: true })
  zone: string;

  @Column({ nullable: true })
  postcode: string;

  @OneToOne(() => DeliverySite )
  delivery_site: DeliverySite;

  @OneToOne(() => Customer )
  @JoinColumn()
  customer: Customer;
}
