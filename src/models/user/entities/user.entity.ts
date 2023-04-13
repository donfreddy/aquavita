import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { EnumEmployeeType, EnumGender } from '../../../common/helpers';
import { UserQuarterPlanning } from '../../../common/entities/user-quarter-planning.entity';
import { Breakdown } from '../../breakdown/entities/breakdown.entity';
import { Payslip } from '../../payslip/entities/payslip.entity';

@Entity('users')
export class User extends AquavitaEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  neighborhood: string;

  @Column({ nullable: true })
  hiring_date: Date;

  @Column({ nullable: true })
  job: string;

  @Column({
    type: 'enum',
    enum: EnumEmployeeType,
    default: EnumEmployeeType.PRODUCTION,
  })
  employee_type: EnumEmployeeType;

  @Column({
    type: 'enum',
    enum: EnumGender,
    default: EnumGender.UNSPECIFIED,
  })
  gender: EnumGender;

  @Exclude()
  @Column({ default: false })
  has_change_pwd: boolean;

  @OneToMany(() => Payslip, (payslip) => payslip.employee)
  @JoinColumn()
  payslips: Payslip[];

  @Exclude()
  @Column({ default: 'user' })
  owner: string;

  @OneToMany(() => Breakdown, (breakdown) => breakdown.assign_to)
  @JoinColumn()
  breakdowns: Breakdown[];

  @OneToMany(() => UserQuarterPlanning, (quarter) => quarter.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  planning: UserQuarterPlanning[];
}
