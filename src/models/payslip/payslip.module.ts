import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { PayslipController } from './payslip.controller';
import { PayslipService } from './payslip.service';
import { Payslip } from './entities/payslip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Payslip, UserQuarterPlanning])],
  controllers: [PayslipController],
  providers: [PayslipService, UserService],
})
export class PayslipModule {
}
