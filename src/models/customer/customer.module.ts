import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Company } from './entities/company.entity';
import { Contract } from '../contract/entities/contract.entity';
import { Address } from './entities/address.entity';
import { Contact } from './entities/contact.entity';
import { WorkSchedule } from './entities/work-schedule.entity';
import { Fountain } from '../fountain/entities/fountain.entity';
import { User } from '../user/entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { Role } from '../role/role.entity';
import { Invoice } from '../invoice/entities/invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customer,
      Company,
      Contract,
      Address,
      Contact,
      WorkSchedule,
      User,
      Fountain,
      UserQuarterPlanning,
      Role,
      Invoice
    ])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {
}
