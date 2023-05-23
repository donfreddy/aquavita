import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Company } from './entities/company.entity';
import { ContractService } from '../contract/contract.service';
import { Contract } from '../contract/entities/contract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer,Company,Contract])],
  controllers: [CustomerController],
  providers: [CustomerService,ContractService],
})
export class CustomerModule {
}
