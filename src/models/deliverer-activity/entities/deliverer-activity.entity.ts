import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { User } from '../../user/entities/user.entity';
import { DeliveryRound } from './delivery-round.entity';
import { DeliverySite } from '../../delivery-site/entities/delivery-site.entity';

@Entity('delivery_activities')
export class DelivererActivity extends AquavitaEntity {
  @Column()
  imma_vehicle: string;

  @Column({ unique: true, nullable: true })
  code: string;

  @Column()
  delivery_date: Date;

  @Column({ nullable: true })
  exit_time: string;

  @Column({ nullable: true })
  return_time: string;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  deliverers: User[];

  @ManyToOne(() => User, { eager: true })
  driver: User;

  @OneToMany(() => DeliveryRound, deliveryRound => deliveryRound.deliverer_activity)
  delivery_round: DeliveryRound;

  // @OneToMany(() => DeliverySlip, deliverySlip => deliverySlip.deliverer_activity)
  // delivery_slips: DeliverySlip[];

  @OneToMany(() => DeliverySite, deliverySite => deliverySite.deliverer_activity)
  delivery_sites: DeliverySite[];
}
