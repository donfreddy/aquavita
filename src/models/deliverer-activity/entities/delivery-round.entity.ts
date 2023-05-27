import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { DelivererActivity } from './deliverer-activity.entity';

@Entity('delivery_rounds')
export class DeliveryRound {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  nb_customers_delivered: string;

  @Column({ nullable: true })
  nb_unexpected_customers: string;

  @Column({ nullable: true })
  nb_carboys_delivered: string;

  @ManyToOne(() => DelivererActivity)
  @JoinColumn()
  deliverer_activity: DelivererActivity;
}
