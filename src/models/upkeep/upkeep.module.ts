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
import { Company } from '../customer/entities/company.entity';
import { Role } from '../role/role.entity';
import { Address } from '../customer/entities/address.entity';
import { Contact } from '../customer/entities/contact.entity';
import { WorkSchedule } from '../customer/entities/work-schedule.entity';
import { Invoice } from '../invoice/entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Upkeep,Customer,Company,User,UserQuarterPlanning,Role,Address,Contact,WorkSchedule,Invoice])],
  controllers: [UpkeepController],
  providers: [UpkeepService,UserService, CustomerService],
})
export class UpkeepModule {}
