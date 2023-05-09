import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {
  }

  async create(inputs: CreateCustomerDto) {

    return this.customerRepo
      .save(inputs)
      .then((entity) => this.getWhere('id', (entity as Customer).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.customerRepo.find({
      order: { name: 'DESC' },
    });
  }

  async get(customerId: string) {
    return this.getWhere('id', customerId, []);
  }

  async update(customerId: string, inputs: UpdateCustomerDto) {
    const foundCustomer = await this.getWhere('id', customerId);
    if (inputs.name) foundCustomer.name = inputs.name;
    if (inputs.type) foundCustomer.type = inputs.type;
    // if (inputs.address) foundCustomer.address = inputs.address;
    if (inputs.carboys_per_week) foundCustomer.carboys_per_week = inputs.carboys_per_week;

    await this.customerRepo.save(foundCustomer);
    return { updated: true };
  }

  async delete(customerId: string) {
    const foundCustomer = await this.getWhere('id', customerId);
    await this.customerRepo.softDelete(foundCustomer);
    return { deleted: true };
  }

  async getWhere(
    key: keyof Customer,
    value: any,
    relations: string[] = [],
    throwsException = true,
  ): Promise<Customer | null> {
    return this.customerRepo
      .findOne({ where: { [key]: value }, relations })
      .then((customer) => {
        if (!customer && throwsException) {
          throw new NotFoundException();
        }
        return customer;
      })
      .catch((error) => Promise.reject(error));
  }
}
