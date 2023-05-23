import { QuarterTimeController } from './quarter-time.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuarterTimeService } from './quarter-time.service';
import { QuarterTime } from './entities/quarter-time.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { QuarterPlanning } from '../../common/entities/quarter-planning.entity';
import { Role } from '../role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuarterTime,UserQuarterPlanning,User,QuarterPlanning,Role])],
  controllers: [QuarterTimeController],
  providers: [QuarterTimeService, UserService],
})
export class QuarterTimeModule {}