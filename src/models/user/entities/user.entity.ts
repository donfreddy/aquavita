import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '../../role/role.enum';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { EnumGender } from '../../../common/helpers';
import { Task } from 'src/models/task/entities/task.entity';
import { UserQuarterTime } from '../../../common/entities/user-quarter-time.entity';

@Entity('users')
export class User extends AquavitaEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  neighborhood: string;

  @Column({ nullable: true })
  hiring_date: Date;

  @Column({ nullable: true })
  job: string;

  @Column({
    type: 'enum',
    enum: EnumGender,
    default: EnumGender.UNSPECIFIED,
  })
  gender: EnumGender;

  @Exclude()
  @Column({ default: false })
  has_change_pwd: boolean;

  @Exclude()
  @Column({ default: 'user' })
  owner: string;

  @Column({ type: 'simple-array' })
  roles: Role[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @Column({ type: 'simple-array', nullable: true })
  planning: UserQuarterTime[];
}
