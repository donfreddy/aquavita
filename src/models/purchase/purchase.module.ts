import { PurchaseController } from './purchase.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchaseService } from './purchase.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule,TypeOrmModule.forFeature([Purchase,])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {
}
