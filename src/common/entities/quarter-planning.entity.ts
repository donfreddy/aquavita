import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { QuarterTime } from '../../models/quater-time/entities/quarter-time.entity';
import { AquavitaEntity } from './aquavita.entity';
import { EnumQuarterPlanningStatus } from '../helpers';
import { Task } from '../../models/task/entities/task.entity';
import { User } from '../../models/user/entities/user.entity';
import { UserQuarterPlanning } from './user-quarter-planning.entity';

@Entity('quarter_planning')
export class QuarterPlanning extends AquavitaEntity {
  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ type: 'enum', enum: EnumQuarterPlanningStatus, default: EnumQuarterPlanningStatus.PENDING })
  status: EnumQuarterPlanningStatus;

  @ManyToOne(() => QuarterTime)
  @JoinColumn()
  quarter: QuarterTime;

  @OneToMany(() => Task, task => task.quarter_planning, {
    onDelete: 'CASCADE'
  })
  tasks: Task[];

  @OneToMany(() => UserQuarterPlanning, (quarter) => quarter.quarter_planning, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  teams: UserQuarterPlanning[];
}
