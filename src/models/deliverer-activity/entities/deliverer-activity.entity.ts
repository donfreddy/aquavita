import { Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { User } from '../../user/entities/user.entity';
import { DeliverySlip } from './delivery-slip.entity';

@Entity('delivery_activities')
export class DelivererActivity extends AquavitaEntity {
  @Column()
  imma_vehicle: string;

  @Column()
  delivery_date: Date;

  @Column()
  exit_time: Date;

  @Column()
  return_time: Date;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  deliverers: User[];

  @ManyToOne(() => User, { eager: true })
  driver: User;

  @Column({ nullable: true })
  turns1_nb_customers_delivered: string;

  @Column({ nullable: true })
  turns1_nb_unexpected_customers: string;

  @Column({ nullable: true })
  turns1_nb_carboys_delivered: string;

  @Column({ nullable: true })
  turns2_nb_customers_delivered: string;

  @Column({ nullable: true })
  turns2_nb_unexpected_customers: string;

  @Column({ nullable: true })
  turns2_nb_carboys_delivered: string;

  @OneToMany(() => DeliverySlip, deliverySlip => deliverySlip.deliverer_activity)
  delivery_slips: DeliverySlip[];
}
