import { TypeOrmModule } from '@nestjs/typeorm';
import { Fountain } from './entities/fountain.entity';
import { FountainController } from './fountain.controller';
import { FountainService } from './fountain.service';

import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { Role } from '../role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Fountain, UserQuarterPlanning,Role])],
  controllers: [FountainController],
  providers: [FountainService, UserService],
  exports: [FountainService, UserService],
})
export class FountainModule {}
