import { Entity, Column, ManyToOne } from 'typeorm';
import { AquavitaEntity } from '../../../common/entities/aquavita.entity';
import { EnumMaterialType } from '../../../common/helpers';
import { User } from '../../user/entities/user.entity';

@Entity('material')
export class Material extends AquavitaEntity {
  @Column({
    type: 'enum',
    enum: EnumMaterialType,
    default: EnumMaterialType.PLANT,
  })
  type: EnumMaterialType;

  @Column()
  quantity: string;

  @Column()
  delivery_note: string;

  @Column()
  release_date: Date;

  @Column()
  exit_date: Date;

  @Column()
  state_of_material: string; //

  @Column()
  vehicle: string;

  @ManyToOne(() => User, { eager: true })
  driver: User;
}
