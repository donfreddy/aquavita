import { Logger, Module } from '@nestjs/common';
import { Seeder } from './seeder';
import { MysqlDatabaseProviderModule } from '../../providers/database/mysql/provider.module';
import { RoleSeederModule } from './role/role-seeder.module';
import { UserSeederModule } from './user/user-seeder.module';

@Module({
  imports: [
    MysqlDatabaseProviderModule,
    RoleSeederModule,
    UserSeederModule,
  ],
  providers: [Logger, Seeder],
})
export class SeederModule {
}