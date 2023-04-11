import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { User } from '../../user/entities/user.entity';

@Entity('purchases')
export class Purchase extends AquavitaEntity {
  @Column()
  item: string;

  @Column()
  quantity: number;

  @Column()
  unit_price: number;

  @Column()
  initial_price: number;

  @ManyToOne(() => User, (user) => user.breakdowns, { eager: true })
  @JoinColumn()
  initiator: User;

  @Column()
  observation: string;

  @Column()
  date: Date;
}
