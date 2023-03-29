import { BreakdownController } from './breakdown.controller';
import { Module } from '@nestjs/common';
import { BreakdownService } from './breakdown.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breakdown } from './entities/breakdown.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Breakdown])],
  controllers: [BreakdownController],
  providers: [BreakdownService],
})
export class BreakdownModule {}
