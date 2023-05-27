import { Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Exclude } from 'class-transformer';
import { WorkSchedule } from './work-schedule.entity';

@Entity('companies')
export class Company {
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
  accounting_general_account: string;

  @Column({ nullable: true })
  accounting_third_party_account: string;

  @Column({ default: false })
  has_tva: boolean;

  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;

  @OneToOne(() => WorkSchedule, { eager: true })
  @JoinColumn()
  work_schedule: WorkSchedule;
}
