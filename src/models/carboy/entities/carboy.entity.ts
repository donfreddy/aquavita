import { Entity, Column } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { EnumCarboyType } from '../../../common/helpers';

@Entity('carboys')
export class Carboy extends AquavitaEntity {
  @Column()
  entitled: string;

  @Column({
    type: 'enum',
    enum: EnumCarboyType,
  })
  type: EnumCarboyType;

  @Column()
  quantity: string;

  @Column()
  date: Date;
}
