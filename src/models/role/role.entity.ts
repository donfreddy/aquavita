import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entity Schema for Roles.
 *
 * @class
 */
@Entity({ name: 'roles' })
export class Role {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  label: string;

  @Column({ default: null })
  description: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: string;
}
