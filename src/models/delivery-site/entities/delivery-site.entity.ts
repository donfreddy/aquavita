import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Customer } from '../../customer/entities/customer.entity';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { Contract } from '../../contract/entities/contract.entity';
import { Address } from '../../customer/entities/address.entity';
import { DelivererActivity } from '../../deliverer-activity/entities/deliverer-activity.entity';

@Entity('delivery_sites')
export class DeliverySite extends AquavitaEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  responsible: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  phone: string;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Contract )
  @JoinColumn()
  contract: Contract;

  @ManyToOne(() => Customer )
  @JoinColumn()
  customer: Customer;

  @ManyToOne(() => DelivererActivity, (delivererActivity) => delivererActivity.delivery_sites)
  @JoinColumn({ name: 'deliverer_activity_id' })
  deliverer_activity: DelivererActivity;
}
