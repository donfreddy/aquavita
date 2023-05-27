import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Contact } from './contact.entity';
import { Company } from './company.entity';


@Entity('schedules')
export class WorkSchedule {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  opening_time: string;

  @Column({ nullable: true })
  pause_time_start: string;

  @Column({ nullable: true })
  pause_time_end: string;

  @Column({ nullable: true })
  closing_time: string;

  @OneToOne(() => Contact)
  @JoinColumn()
  company: Company;
}
