import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../models/user/entities/user.entity';
import { AquavitaEntity } from './aquavita.entity';
import { QuarterPlanning } from './quarter-planning.entity';
import { Task } from '../../models/task/entities/task.entity';

@Entity('user_quarter_planning')
export class UserQuarterPlanning extends AquavitaEntity {

  @ManyToOne(() => User, (user) => user.planning, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  user: User;

  @Column({ default: false })
  is_leader: boolean;

  @OneToMany(() => Task, (task) => task.user_planning, {
    onDelete: 'CASCADE'
  })
  tasks: Task[];

  @ManyToOne(() => QuarterPlanning, (quarter) => quarter.teams)
  @JoinColumn()
  quarter_planning: QuarterPlanning;
}
