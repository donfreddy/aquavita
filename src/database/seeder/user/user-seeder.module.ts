import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../models/user/entities/user.entity';
import { UserSeederService } from './user-seeder.service';

/**
 * Import and provide seeder classes for users.
 *
 * @module
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class UserSeederModule {
}