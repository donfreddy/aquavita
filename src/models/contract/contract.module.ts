import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/entities/customer.entity';
import { Company } from '../customer/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contract,Company,Customer])],
  controllers: [ContractController],
  providers: [ContractService,CustomerService],
})
export class ContractModule {
}
