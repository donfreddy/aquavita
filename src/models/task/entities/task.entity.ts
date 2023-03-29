import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { EnumTaskStatus } from '../../../common/helpers';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { QuarterTime } from '../../quater-time/entities/quarter-time.entity';
import { QuarterPlanning } from '../../../common/entities/quarter-planning.entity';
import { UserQuarterPlanning } from '../../../common/entities/user-quarter-planning.entity';

@Entity('tasks')
export class Task extends AquavitaEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  due_date: Date;

  @Column({
    type: 'enum',
    enum: EnumTaskStatus,
    default: EnumTaskStatus.TO_DO,
  })
  status: EnumTaskStatus;

  @ManyToOne(() => UserQuarterPlanning, (user) => user.tasks)
  @JoinColumn()
  user_planning: UserQuarterPlanning;

  @ManyToOne(() => QuarterPlanning, (quarterPlanning) => quarterPlanning.tasks)
  @JoinColumn()
  quarter_planning: QuarterPlanning;
}
