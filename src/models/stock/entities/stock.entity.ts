import { Entity, Column } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';

@Entity('stocks')
export class Stock extends AquavitaEntity {
  @Column()
  label: string;

  @Column()
  quantity: string;
}
