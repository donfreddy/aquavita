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
  })
  status: EnumPresenceStatus;

  @Column({ default: false })
  is_visitor: boolean;

  @Column({ default: false })
  archived: boolean;

  @Column()
  visitor_name: string;

  @Column()
  visitor_phone_number: string;

  @Column()
  motif: string;

  @Column()
  date: Date;
}
