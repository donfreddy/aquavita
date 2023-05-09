import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { EnumBreakdownStatus, EnumUpkeepStatus, EnumUpkeepType } from '../../../common/helpers';
import { User } from '../../user/entities/user.entity';
import { Customer } from '../../customer/entities/customer.entity';

@Entity('upkeep')
export class Upkeep extends AquavitaEntity {
  @Column({
    type: 'enum',
    enum: EnumUpkeepType,
  })
  type: EnumUpkeepType;

  @Column({ nullable: true })
  observation: string;

  @Column()
  next_upkeep: Date;

  @Column({
    type: 'enum',
    enum: EnumUpkeepStatus,
    default: EnumUpkeepStatus.OK,
  })
  status: EnumUpkeepStatus;

  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn()
  customer: Customer;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  maintained_by: User;
}
