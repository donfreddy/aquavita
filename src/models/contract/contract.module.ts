import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/entities/customer.entity';
import { Company } from '../customer/entities/company.entity';
import { Address } from '../customer/entities/address.entity';
import { Contact } from '../customer/entities/contact.entity';
import { WorkSchedule } from '../customer/entities/work-schedule.entity';
import { Fountain } from '../fountain/entities/fountain.entity';
import { FountainService } from '../fountain/fountain.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { Role } from '../role/role.entity';
import { DeliverySite } from '../delivery-site/entities/delivery-site.entity';
import { DeliverySiteService } from '../delivery-site/delivery-site.service';
import { Invoice } from '../invoice/entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Contract,
    Company,
    Customer,
    Address,
    Contact,
    WorkSchedule,
    Fountain,
    User,
    Fountain,
    UserQuarterPlanning,
    Role,
    DeliverySite,
    Invoice
  ])],
  controllers: [ContractController],
  providers: [
    ContractService,
    CustomerService,
    FountainService,
    UserService,
    DeliverySiteService,
  ],
})
export class ContractModule {
}
