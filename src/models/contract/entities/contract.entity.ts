import { Entity, Column, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { EnumInvoicingProfile } from '../../../common/helpers';
import { Customer } from '../../customer/entities/customer.entity';
import { DeliverySite } from '../../delivery-site/entities/delivery-site.entity';
import { Fountain } from '../../fountain/entities/fountain.entity';

@Entity('contracts')
export class Contract extends AquavitaEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({
    type: 'enum',
    enum: EnumInvoicingProfile,
  })
  invoicing_profile: EnumInvoicingProfile;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  invoiced_amount_per_month: string;

  @Column({ nullable: true })
  amount_carboy: string;

  @Column()
  effective_date: Date;//e6c851ab-01b6-4e9a-b270-3ca414ce5e93

  @Column({ default: false })
  signed_and_classified: boolean;

  @Column({ default: false })
  is_terminated: boolean;

  @Column({ nullable: true })
  termination_date: Date;

  @Column({ nullable: true })
  termination_raison: string;

  @Column({ default: 0 })
  carboys_per_week: number;

  @Column({ default: 0 })
  placed_fountain: number;

  @OneToOne(() => Customer, customer => customer.contract)
  @JoinColumn()
  customer: Customer;

  @OneToMany(() => DeliverySite, (deliverySite) => deliverySite.contract)
  delivery_sites: DeliverySite[];

  @OneToMany(() => Fountain, (fountain) => fountain.contract)
  fountains: Fountain[];
}
