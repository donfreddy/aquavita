import { Entity, Column } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';

@Entity('breakdowns')
export class Breakdown extends AquavitaEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;


}
