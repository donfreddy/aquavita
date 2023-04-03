import { Entity, Column } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';

@Entity('purchase_orders')
export class PurchaseOrder extends AquavitaEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  po_number: string; // purchase order number

  @Column({ default: '0' })
  amount: string;

  @Column()
  issue_day: Date;

  @Column({ nullable: true })
  file: string;

  //
  // @Column({
  //   type: 'enum',
  //   enum: EnumBreakdownPriority,
  //   default: EnumBreakdownPriority.LOW,
  // })
  // priority: EnumBreakdownPriority;
  //
  // @Column({
  //   type: 'enum',
  //   enum: EnumBreakdownStatus,
  //   default: EnumBreakdownStatus.DECLARED,
  // })
  // status: EnumBreakdownStatus;
  //
  // @ManyToOne(() => User, (user) => user.breakdowns, { eager: true })
  // @JoinColumn()
  // assign_to: User;
}
