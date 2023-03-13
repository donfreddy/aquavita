import { LocalFileService } from './local-file.service';
import { Module } from '@nestjs/common';
import { LocalFile } from './entities/local-file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LocalFile])],
  controllers: [],
  providers: [LocalFileService],
})
export class LocalFileModule {}
