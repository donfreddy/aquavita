import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { Customer } from './customer.entity';

@Entity('addresses')
export class Address extends AquavitaEntity {
  @Column({ nullable: true })
  street: string;

  @Column({ default: 'Douala' })
  city: string;

  @Column({ default: 'Littoral' })
  region: string;

  @Column({ nullable: true })
  phone_number_1: string;

  @Column({ nullable: true })
  phone_number_2: string;

  @Column({ nullable: true })
  zone: string;

  @Column({ nullable: true })
  postcode: string;

  @Column({ nullable: true })
  taxpayer_number: string;

  @Column({ nullable: true })
  rc_number: string;

  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn()
  customer: Customer;
}
