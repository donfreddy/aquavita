import { Injectable } from '@nestjs/common';
import { configService } from 'src/config/config.service';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor() {}

  createTypeOrmOptions(): MysqlConnectionOptions {
    return {
      type: 'mysql',
      host: configService.getDB().host,
      port: configService.getDB().port,
      username: configService.getDB().username,
      password: configService.getDB().password,
      database: configService.getDB().database,
      synchronize: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      logging: ['error'],
    } as MysqlConnectionOptions;
  }
}
  