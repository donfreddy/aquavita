import { Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Exclude } from 'class-transformer';

@Entity('companies')
export class Company  {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  year_of_creation: string;

  @Column({ default: 0 })
  effective: number;

  @Column({ nullable: true })
  responsible: string;

  @Column({ nullable: true })
  activity: string;

  @Column({ nullable: true })
  taxpayer_number: string;

  @Column({ nullable: true })
  trade_register_number: string;

  @Column({ nullable: true })
  opening_time: Date;

  @Column({ nullable: true })
  pause_time_start: Date;

  @Column({ nullable: true })
  pause_time_end: Date;

  @Column({ nullable: true })
  closing_time: Date;

  @OneToOne(() => Customer )
  @JoinColumn()
  customer: Customer;
}
