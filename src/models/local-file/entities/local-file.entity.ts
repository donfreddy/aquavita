import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('local-files')
export class LocalFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  destination: string;

  @Column()
  mimetype: string;
}
