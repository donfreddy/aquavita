import {
  Entity,
  Column,
  PrimaryGeneratedColumn, OneToMany, DeleteDateColumn, ManyToMany,
} from 'typeorm';
import { EnumQuarterTimeStatus } from '../../../common/helpers';
import { Task } from '../../task/entities/task.entity';
import { Exclude } from 'class-transformer';
import { UserQuarterPlanning } from '../../../common/entities/user-quarter-planning.entity';
import { QuarterPlanning } from '../../../common/entities/quarter-planning.entity';

@Entity('quarter_times')
export class QuarterTime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  start_time: string;

  @Column({ nullable: true })
  end_time: string;

  @Column({ type: 'enum', enum: EnumQuarterTimeStatus, default: EnumQuarterTimeStatus.FREE })
  status: EnumQuarterTimeStatus;


  @OneToMany(() => QuarterPlanning, planning => planning.quarter, {
    onDelete: 'CASCADE'
  })
  plannings: QuarterPlanning[];

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;
}
