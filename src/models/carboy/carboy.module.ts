import { CarboyController } from './carboy.controller';
import { CarboyService } from './carboy.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carboy } from './entities/carboy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carboy])],
  controllers: [CarboyController],
  providers: [CarboyService],
})
export class CarboyModule {
}
