import { BreakdownController } from './breakdown.controller';
import { Module } from '@nestjs/common';
import { BreakdownService } from './breakdown.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breakdown } from './entities/breakdown.entity';
import { BreakdownType } from './entities/breakdown-type.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { Role } from '../role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Breakdown,BreakdownType,User,UserQuarterPlanning,Role])],
  controllers: [BreakdownController],
  providers: [BreakdownService,UserService],
})
export class BreakdownModule {}
