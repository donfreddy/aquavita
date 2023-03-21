import { QuarterTimeController } from './quarter-time.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuarterTimeService } from './quarter-time.service';
import { QuarterTime } from './entities/quarter-time.entity';
import { UserQuarterTime } from '../../common/entities/user-quarter-time.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuarterTime,UserQuarterTime,User])],
  controllers: [QuarterTimeController],
  providers: [QuarterTimeService, UserService],
})
export class QuarterTimeModule {}