import { Logger, Module } from '@nestjs/common';
import { Seeder } from './seeder';
import { MysqlDatabaseProviderModule } from '../../providers/database/mysql/provider.module';

@Module({
  imports: [MysqlDatabaseProviderModule],
  providers: [Logger, Seeder],
})
export class SeederModule {
}