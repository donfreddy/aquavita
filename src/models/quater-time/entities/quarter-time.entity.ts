import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EnumQuarterTimeStatus } from '../../../common/helpers';

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

  // @ManyToMany(() => UserQuarterTime, { eager: true })
  // plannings: UserQuarterTime[];
}
