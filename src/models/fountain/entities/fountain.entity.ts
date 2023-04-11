import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { User } from 'src/models/user/entities/user.entity';

@Entity('fountains')
export class Fountain extends AquavitaEntity {
  @Column()
  client_name: string;

  @Column()
  serial_number: string;

  @Column()
  vehicule: string;

  @Column()
  reason: string;

  @ManyToOne(() => User, (user) => user.breakdowns, { eager: true })
  @JoinColumn()
  deliverer: User;

  @Column()
  delivery_date: Date;
}
