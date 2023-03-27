import {
  Entity,
  Column,
  PrimaryGeneratedColumn, ManyToOne, OneToMany,
} from 'typeorm';
import { EnumQuarterTimeStatus } from '../../../common/helpers';
import { Task } from '../../task/entities/task.entity';

@Entity('quarter_times')
export class QuarterTime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column({ type: 'enum', enum: EnumQuarterTimeStatus, default: EnumQuarterTimeStatus.PENDING })
  status: EnumQuarterTimeStatus;

  // add task column
  @OneToMany(() => Task,task=>task.quarter_time)
  tasks: Task[];

  // @ManyToMany(() => UserQuarterTime, { eager: true })
  // plannings: UserQuarterTime[];
}
