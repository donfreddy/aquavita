import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {
  }

  async create(inputs: CreateCustomerDto) {
    const { company, ...customer } = inputs;

    // create company
    const newCompany = new Company();
    if (company.year_of_creation) newCompany.year_of_creation = company.year_of_creation;
    if (company.effective) newCompany.effective = company.effective;
    if (company.responsible) newCompany.responsible = company.responsible;
    if (company.activity) newCompany.activity = company.activity;
    if (company.taxpayer_number) newCompany.taxpayer_number = company.taxpayer_number;
    if (company.trade_register_number) newCompany.trade_register_number = company.trade_register_number;
    if (company.opening_time) newCompany.opening_time = new Date(company.opening_time);
    if (company.pause_time_start) newCompany.pause_time_start = new Date(company.pause_time_start);
    if (company.pause_time_end) newCompany.pause_time_end = new Date(company.pause_time_end);
    if (company.closing_time) newCompany.closing_time = new Date(company.closing_time);
    await this.companyRepo.save(newCompany);

    // create customer
    const newCustomer = new Customer();
    newCustomer.name = customer.name;
    newCustomer.type = customer.type;
    newCustomer.address = customer.address;
    newCustomer.zone = customer.zone;
    if (customer.complement) newCustomer.complement = customer.complement;
    if (customer.postcode) newCustomer.postcode = customer.postcode;
    if (customer.city) newCustomer.city = customer.city;
    if (customer.phone) newCustomer.city = customer.phone;
    if (customer.fax) newCustomer.fax = customer.fax;
    if (customer.email) newCustomer.email = customer.email;
    if (customer.website) newCustomer.website = customer.website;
    if (customer.fountains_count) newCustomer.fountains_count = customer.fountains_count;
    if (customer.accounting_third_party_account) newCustomer.accounting_third_party_account = customer.accounting_third_party_account;
    if (customer.has_tva) newCustomer.has_tva = customer.has_tva;
    if (customer.is_blocked) newCustomer.is_blocked = customer.is_blocked;
    if (customer.blocking_reason) newCustomer.blocking_reason = customer.blocking_reason;
    if (customer.blocking_date) newCustomer.blocking_date = new Date(customer.blocking_date);
    if (customer.blocking_employee) newCustomer.blocking_employee = customer.blocking_employee;
    if (customer.blocking_last_update) newCustomer.blocking_last_update = new Date(customer.blocking_last_update);
    newCustomer.company = newCompany;

    return this.customerRepo
      .save(newCustomer)
      .then((entity) => this.getWhere('id', (entity as Customer).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.customerRepo.find({
      order: { name: 'DESC' },
    });
  }

  async get(customerId: string) {
    return this.getWhere('id', customerId, ['delivery_slips', 'invoices']);
  }

  async update(customerId: string, inputs: UpdateCustomerDto) {
    const foundCustomer = await this.getWhere('id', customerId);
    const foundCompany = await this.companyRepo.findOne({ where: { id: foundCustomer.company.id } });

    // update company
    if (inputs.company) {
      const { company } = inputs;

      if (company.year_of_creation) foundCompany.year_of_creation = company.year_of_creation;
      if (company.effective) foundCompany.effective = company.effective;
      if (company.responsible) foundCompany.responsible = company.responsible;
      if (company.activity) foundCompany.activity = company.activity;
      if (company.taxpayer_number) foundCompany.taxpayer_number = company.taxpayer_number;
      if (company.trade_register_number) foundCompany.trade_register_number = company.trade_register_number;
      if (company.opening_time) foundCompany.opening_time = new Date(company.opening_time);
      if (company.pause_time_start) foundCompany.pause_time_start = new Date(company.pause_time_start);
      if (company.pause_time_end) foundCompany.pause_time_end = new Date(company.pause_time_end);
      if (company.closing_time) foundCompany.closing_time = new Date(company.closing_time);
      await this.companyRepo.save(foundCompany);
    }

    // update customer
    if (inputs.name) foundCustomer.name = inputs.name;
    if (inputs.type) foundCustomer.type = inputs.type;
    if (inputs.address) foundCustomer.address = inputs.address;
    if (inputs.zone) foundCustomer.zone = inputs.zone;
    if (inputs.complement) foundCustomer.complement = inputs.complement;
    if (inputs.postcode) foundCustomer.postcode = inputs.postcode;
    if (inputs.city) foundCustomer.city = inputs.city;
    if (inputs.phone) foundCustomer.city = inputs.phone;
    if (inputs.fax) foundCustomer.fax = inputs.fax;
    if (inputs.email) foundCustomer.email = inputs.email;
    if (inputs.website) foundCustomer.website = inputs.website;
    if (inputs.fountains_count) foundCustomer.fountains_count = inputs.fountains_count;
    if (inputs.accounting_third_party_account) inputs.accounting_third_party_account = foundCustomer.accounting_third_party_account;
    if (inputs.has_tva) foundCustomer.has_tva = inputs.has_tva;
    if (inputs.is_blocked) foundCustomer.is_blocked = inputs.is_blocked;
    if (inputs.blocking_reason) foundCustomer.blocking_reason = inputs.blocking_reason;
    if (inputs.blocking_date) foundCustomer.blocking_date = new Date(inputs.blocking_date);
    if (inputs.blocking_employee) foundCustomer.blocking_employee = inputs.blocking_employee;
    if (inputs.blocking_last_update) foundCustomer.blocking_last_update = new Date(foundCustomer.blocking_last_update);
    if (inputs.company) foundCustomer.company = foundCompany;

    await this.customerRepo.save(foundCustomer);
    return { updated: true };
  }

  async delete(customerId: string) {
    const foundCustomer = await this.getWhere('id', customerId);
    foundCustomer.deleted_at = new Date();
    await this.customerRepo.save(foundCustomer);
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
          throw new NotFoundException(`Customer with ${key} ${value} not found`);
        }
        return customer;
      })
      .catch((error) => Promise.reject(error));
  }
}
