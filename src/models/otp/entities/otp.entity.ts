import { EnumOtpRaison } from 'src/common/helpers';
import { User } from 'src/models/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Otp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'enum', enum: EnumOtpRaison })
  reason: EnumOtpRaison;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @Column({ default: false })
  is_used: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  expired_at: Date;
}
