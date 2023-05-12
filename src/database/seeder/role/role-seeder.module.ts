import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../../models/role/role.entity';
import { RoleSeederService } from './role-seeder.service';

/**
 * Import and provide seeder classes for roles.
 *
 * @module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleSeederService],
  exports: [RoleSeederService],
})
export class RoleSeederModule {
}