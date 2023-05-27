import { InvoiceController } from './invoice.controller';
import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/entities/customer.entity';
import { Company } from '../customer/entities/company.entity';
import { DeliverySlip } from '../deliverer-activity/entities/delivery-slip.entity';
import { Role } from '../role/role.entity';
import { Address } from '../customer/entities/address.entity';
import { Contact } from '../customer/entities/contact.entity';
import { WorkSchedule } from '../customer/entities/work-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice,DeliverySlip,Customer,Company,User,UserQuarterPlanning,Role,Address,Contact,WorkSchedule])],
  controllers: [InvoiceController],
  providers: [InvoiceService,UserService, CustomerService],
})
export class InvoiceModule {}
