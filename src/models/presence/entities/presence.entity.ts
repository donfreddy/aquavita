import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { User } from '../../user/entities/user.entity';
import { EnumPresenceStatus } from '../../../common/helpers';

@Entity('presences')
export class Presence extends AquavitaEntity {

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: EnumPresenceStatus,
    default: EnumPresenceStatus.PRESENT,
  })
  status: EnumPresenceStatus;

  @Column({ default: false })
  is_visitor: boolean;

  @Column({ default: false })
  archived: boolean;

  @Column({ nullable: true })
  visitor_name: string;

  @Column({ nullable: true })
  visitor_phone_number: string;

  @Column({ nullable: true })
  motif: string;

  @Column()
  date: Date;
}
