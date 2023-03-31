import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { EnumBreakdownPriority, EnumBreakdownStatus } from '../../../common/helpers';
import { User } from '../../user/entities/user.entity';

@Entity('breakdowns')
export class Breakdown extends AquavitaEntity {
  @Column()
  name: string;

  @Column({ nullable: true, type:'longtext' })
  description: string;

  @Column({ nullable: true })
  tracking_time: Date;

  @Column({ nullable: true})
  type: string;

  @Column({
    type: 'enum',
    enum: EnumBreakdownPriority,
    default: EnumBreakdownPriority.LOW,
  })
  priority: EnumBreakdownPriority;

  @Column({
    type: 'enum',
    enum: EnumBreakdownStatus,
    default: EnumBreakdownStatus.DECLARED,
  })
  status: EnumBreakdownStatus;

  @ManyToOne(() => User, (user) => user.breakdowns, { eager: true })
  @JoinColumn()
  assign_to: User;
}
