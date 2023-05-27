import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Exclude } from 'class-transformer';

@Entity('contacts')
export class Contact {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  fax: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  website: string;

  @OneToOne(() => Customer )
  @JoinColumn()
  customer: Customer;
}
