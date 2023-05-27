import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { EnumDeliverySlipStatus } from '../../../common/helpers';
import { DelivererActivity } from './deliverer-activity.entity';
import { DeliverySite } from '../../delivery-site/entities/delivery-site.entity';

@Entity('delivery_slips')
export class DeliverySlip extends AquavitaEntity {
  @Column({ nullable: true })
  stock: string;

  @Column({ default: 0 })
  contract: number;

  @Column({ default: 0 })
  carboys_delivered: number;

  @Column({ default: false })
  is_unanticipated: boolean;

  @Column({ default: 0 })
  carboys_recovered_in_state: number;

  @Column({ default: 0 })
  carboys_recovered_in_broken: number;

  @Column({
    type: 'enum',
    enum: EnumDeliverySlipStatus,
    default: EnumDeliverySlipStatus.PENDING,
  })
  status: EnumDeliverySlipStatus;

  @Column({ nullable: true })
  observation: string;

  @ManyToOne(() => DeliverySite, { eager: true })
  @JoinColumn()
  deliverySite: DeliverySite;

  // @ManyToOne(() => DelivererActivity, (delivererActivity) => delivererActivity.delivery_sites)
  // @JoinColumn({ name: 'deliverer_activity_id' })
  // deliverer_activity: DelivererActivity;
}
