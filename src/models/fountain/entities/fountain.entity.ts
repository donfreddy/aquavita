import { Entity, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { User } from 'src/models/user/entities/user.entity';
import { Contract } from '../../contract/entities/contract.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { DeliverySite } from '../../delivery-site/entities/delivery-site.entity';

@Entity('fountains')
export class Fountain extends AquavitaEntity {
  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  serial_number: string;

  @Column({ nullable: true })
  brand: string;

  @Column()
  delivery_date: Date;

  @Column({ nullable: true })
  release_date_in_stock: Date;

  @Column({ nullable: true })
  installation_date: Date;

  @Column({ nullable: true })
  maintenance_interval: string;

  @Column({ nullable: true })
  upkeep_date: Date;

  @OneToOne(() => DeliverySite, deliverySite => deliverySite.contract)
  @JoinColumn()
  delivery_site: DeliverySite;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  installed_by: User;

  @ManyToOne(() => Contract)
  @JoinColumn()
  contract: Contract;
}
