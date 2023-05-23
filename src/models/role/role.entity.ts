import { Exclude } from 'class-transformer';
import { PermissionRole } from 'src/permission/enum/permission.enum';
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

  @Column({
    type: 'enum',
    enum: PermissionRole,
    default: PermissionRole.SIMPLE_USER,
  })
  label: PermissionRole;

  @Column({ default: null })
  description: string;

  @Exclude()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: string;
}
