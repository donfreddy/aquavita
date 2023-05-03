import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ default: null })
  label: string;

  @Column({ default: null })
  description: string;
}
