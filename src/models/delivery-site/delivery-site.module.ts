import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverySiteService } from './delivery-site.service';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/entities/customer.entity';
import { DeliverySiteController } from './delivery-site.controller';
import { DeliverySite } from './entities/delivery-site.entity';
import { Company } from '../customer/entities/company.entity';
import { Address } from '../customer/entities/address.entity';
import { WorkSchedule } from '../customer/entities/work-schedule.entity';
import { Contact } from '../customer/entities/contact.entity';
import { Invoice } from '../invoice/entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    DeliverySite,
    Customer,
    Company,
    Address,
    WorkSchedule,
    Contact,
    Invoice
  ])],
  controllers: [DeliverySiteController],
  providers: [
    DeliverySiteService,
    CustomerService,
  ],
  exports: [
    DeliverySiteService,
    CustomerService,
  ],
})
export class DeliverySiteModule {
}
