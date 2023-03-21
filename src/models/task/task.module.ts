import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { UserQuarterTime } from '../../common/entities/user-quarter-time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task,User,UserQuarterTime])],
  controllers: [TaskController],
  providers: [TaskService, UserService],
})
export class TaskModule {}
