import { Module } from '@nestjs/common';
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { QuarterPlanning } from '../../common/entities/quarter-planning.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UserQuarterPlanning,QuarterPlanning])],
  controllers: [PlanningController],
  providers: [PlanningService],
})
export class PlanningModule {
}
