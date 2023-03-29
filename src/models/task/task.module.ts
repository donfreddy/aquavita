import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { QuarterTimeService } from '../quater-time/quarter-time.service';
import { QuarterTime } from '../quater-time/entities/quarter-time.entity';
import { QuarterPlanning } from '../../common/entities/quarter-planning.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task,User,UserQuarterPlanning,QuarterTime,QuarterPlanning])],
  controllers: [TaskController],
  providers: [TaskService, UserService, QuarterTimeService],
})
export class TaskModule {}
