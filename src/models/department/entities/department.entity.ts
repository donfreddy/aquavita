import { Entity, Column, OneToMany } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { User } from 'src/models/user/entities/user.entity';


@Entity('department')
export class Department extends AquavitaEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.department)
  users: User[];
}
