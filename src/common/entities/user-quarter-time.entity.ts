import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../models/user/entities/user.entity';
import { QuarterTime } from '../../models/quater-time/entities/quarter-time.entity';
import { AquavitaEntity } from './aquavita.entity';

@Entity('user_quarter-time')
export class UserQuarterTime extends AquavitaEntity {
  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => QuarterTime)
  @JoinColumn()
  quarter_time: QuarterTime;

  @Column({ default: false })
  is_leader: boolean;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;
}