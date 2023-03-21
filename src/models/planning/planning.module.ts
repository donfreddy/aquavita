import { Module } from '@nestjs/common';
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuarterTime } from '../../common/entities/user-quarter-time.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UserQuarterTime])],
  controllers: [PlanningController],
  providers: [PlanningService],
})
export class PlanningModule {
}
