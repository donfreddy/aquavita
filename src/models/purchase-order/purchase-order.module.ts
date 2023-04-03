import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrderService } from './purchase-order.service';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { LocalFileService } from '../local-file/local-file.service';
import { LocalFile } from '../local-file/entities/local-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseOrder,LocalFile])],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService,LocalFileService],
})
export class PurchaseOrderModule {
}
