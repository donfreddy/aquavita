import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { EnumTaskStatus } from '../../../common/helpers';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';

@Entity('tasks')
export class Task extends AquavitaEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  due_date: Date;

  @Column({
    type: 'enum',
    enum: EnumTaskStatus,
    default: EnumTaskStatus.TO_DO,
  })
  status: EnumTaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  user: User;
}
