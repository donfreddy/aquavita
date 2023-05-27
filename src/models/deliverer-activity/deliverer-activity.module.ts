import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { UserService } from '../user/user.service';
import { DelivererActivityService } from './deliverer-activity.service';
import { DelivererActivity } from './entities/deliverer-activity.entity';
import { CustomerService } from '../customer/customer.service';
import { PurchaseOrderService } from '../purchase-order/purchase-order.service';
import { Customer } from '../customer/entities/customer.entity';

import { LocalFileService } from '../local-file/local-file.service';
import { LocalFile } from '../local-file/entities/local-file.entity';
import { DelivererActivityController } from './deliverer-activity.controller';
import { DeliverySlip } from './entities/delivery-slip.entity';
import { PurchaseOrder } from '../purchase-order/entities/purchase-order.entity';
import { Company } from '../customer/entities/company.entity';
import { Role } from '../role/role.entity';
import { Address } from '../customer/entities/address.entity';
import { Contact } from '../customer/entities/contact.entity';
import { WorkSchedule } from '../customer/entities/work-schedule.entity';
import { Fountain } from '../fountain/entities/fountain.entity';
import { FountainService } from '../fountain/fountain.service';
import { Invoice } from '../invoice/entities/invoice.entity';
import { DeliveryRound } from './entities/delivery-round.entity';
import { DeliverySiteService } from '../delivery-site/delivery-site.service';
import { DeliverySite } from '../delivery-site/entities/delivery-site.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    User,
    Customer,
    Company,
    DeliverySlip,
    PurchaseOrder,
    DelivererActivity,
    UserQuarterPlanning,
    LocalFile,
    Role,
    Address,
    Contact,
    WorkSchedule,
    Fountain,
    Invoice,
    DeliveryRound,
    DeliverySite
  ])],
  controllers: [DelivererActivityController],
  providers: [
    DelivererActivityService,
    UserService,
    CustomerService,
    PurchaseOrderService,
    LocalFileService,
    FountainService,
    DeliverySiteService
  ],
})
export class DelivererActivityModule {
}
