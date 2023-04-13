import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { User } from '../../user/entities/user.entity';

@Entity('purchases')
export class Purchase extends AquavitaEntity {
  @Column()
  item: string;

  @Column()
  quantity: string;

  @Column()
  unit_price: string;

  @Column()
  initial_price: string;

  @ManyToOne(() => User, (user) => user.breakdowns, { eager: true })
  @JoinColumn()
  initiator: User;

  @Column({ nullable: true})
  observation: string;

  @Column()
  date: Date;
}
