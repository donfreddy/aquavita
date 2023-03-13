import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuarterTimeService } from './quarter-time.service';
import { QuarterTime } from './entities/quarter-time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuarterTime])],
  controllers: [],
  providers: [QuarterTimeService],
})
export class QuarterTimeModule {
}
