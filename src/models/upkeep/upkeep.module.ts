import { UpkeepController } from './upkeep.controller';
import { Module } from '@nestjs/common';
import { UpkeepService } from './upkeep.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upkeep } from './entities/upkeep.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Upkeep,Customer,User,UserQuarterPlanning])],
  controllers: [UpkeepController],
  providers: [UpkeepService,UserService, CustomerService],
})
export class UpkeepModule {}
