import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { UserService } from '../user/user.service';
import { DeliverySlipController } from './delivery-slip.controller';
import { DeliverySlipService } from './delivery-slip.service';
import { DeliverySlip } from './entities/delivery-slip.entity';
import { CustomerService } from '../customer/customer.service';
import { PurchaseOrderService } from '../purchase-order/purchase-order.service';
import { Customer } from '../customer/entities/customer.entity';
import { PurchaseOrder } from '../purchase-order/entities/purchase-order.entity';
import { LocalFileService } from '../local-file/local-file.service';
import { LocalFile } from '../local-file/entities/local-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Customer, PurchaseOrder, DeliverySlip, UserQuarterPlanning, LocalFile])],
  controllers: [DeliverySlipController],
  providers: [DeliverySlipService, UserService, CustomerService, PurchaseOrderService, LocalFileService],
})
export class DeliverySlipModule {
}
