import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Company } from './entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer,Company])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {
}
