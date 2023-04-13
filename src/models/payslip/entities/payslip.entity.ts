import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { User } from 'src/models/user/entities/user.entity';
import { EnumPayslipStatus } from '../../../common/helpers';


@Entity('payslips')
export class Payslip extends AquavitaEntity {
  @ManyToOne(() => User, (user) => user.payslips, { eager: true })
  @JoinColumn()
  employee: User;

  @Column()
  salary: string;

  @Column({
    type: 'enum',
    enum: EnumPayslipStatus,
    default: EnumPayslipStatus.UNPAID,
  })
  status: EnumPayslipStatus;

  @Column()
  date: Date;
}
