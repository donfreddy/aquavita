import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { UserService } from '../user/user.service';
import { DelivererActivityService } from './deliverer-activity.service';
import { DelivererActivity } from './entities/deliverer-activity.entity';
import { CustomerService } from '../customer/customer.service';
import { PurchaseOrderService } from '../purchase-order/purchase-order.service';
import { Customer } from '../customer/entities/customer.entity';;
import { LocalFileService } from '../local-file/local-file.service';
import { LocalFile } from '../local-file/entities/local-file.entity';
import { DelivererActivityController } from './deliverer-activity.controller';
import { DeliverySlip } from './entities/delivery-slip.entity';
import { PurchaseOrder } from '../purchase-order/entities/purchase-order.entity';
import { Company } from '../customer/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer,Company, DeliverySlip,PurchaseOrder, DelivererActivity, UserQuarterPlanning, LocalFile])],
  controllers: [DelivererActivityController],
  providers: [DelivererActivityService, UserService, CustomerService, PurchaseOrderService, LocalFileService],
})
export class DelivererActivityModule {
}
