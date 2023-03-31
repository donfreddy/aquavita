import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';

@Entity('breakdown_types')
export class BreakdownType extends AquavitaEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  label: string;
}
