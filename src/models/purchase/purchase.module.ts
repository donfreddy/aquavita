import { PurchaseController } from './purchase.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchaseService } from './purchase.service';
import { User } from '../user/entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, User, UserQuarterPlanning])],
  controllers: [PurchaseController],
  providers: [PurchaseService, UserService],
})
export class PurchaseModule {
}
