import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Company } from './entities/company.entity';
import { WorkSchedule } from './entities/work-schedule.entity';
import { Address } from './entities/address.entity';
import { Contact } from './entities/contact.entity';
import { getUniqueCode } from '../../common/helpers';
import { Invoice } from '../invoice/entities/invoice.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
    @InjectRepository(WorkSchedule)
    private readonly workScheduleRepo: Repository<WorkSchedule>,
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
  ) {
  }

  async create(inputs: CreateCustomerDto) {
    const { company, contact, address, ...customer } = inputs;
    let newCompany = null;

    // create company
    if (company) {
      const { work_schedule } = company;
      // Create company work schedule
      const newWorkSchedule = new WorkSchedule();
      if (work_schedule.opening_time) newWorkSchedule.opening_time = work_schedule.opening_time;
      if (work_schedule.pause_time_start) newWorkSchedule.pause_time_start = work_schedule.pause_time_start;
      if (work_schedule.pause_time_end) newWorkSchedule.pause_time_end = work_schedule.pause_time_end;
      if (work_schedule.closing_time) newWorkSchedule.closing_time = work_schedule.closing_time;
      await this.workScheduleRepo.save(newWorkSchedule);

      newCompany = new Company();
      if (company.year_of_creation) newCompany.year_of_creation = company.year_of_creation;
      if (company.effective) newCompany.effective = company.effective;
      if (company.responsible) newCompany.responsible = company.responsible;
      if (company.activity) newCompany.activity = company.activity;
      if (company.taxpayer_number) newCompany.taxpayer_number = company.taxpayer_number;
      if (company.trade_register_number) newCompany.trade_register_number = company.trade_register_number;
      if (company.work_schedule) newCompany.work_schedule = newWorkSchedule;
      if (company.accounting_third_party_account) newCompany.accounting_third_party_account = company.accounting_third_party_account;
      if (company.has_tva) newCompany.has_tva = company.has_tva;
      await this.companyRepo.save(newCompany);
    }


    // Create address
    const newAddress = new Address();
    newAddress.address = address.address;
    if (address.city) newAddress.city = address.city;
    if (address.zone) newAddress.zone = address.zone;
    if (address.postcode) newAddress.postcode = address.postcode;
    await this.addressRepo.save(newAddress);

    // Create contact
    const newContact = new Contact();
    newContact.phone = contact.phone;
    if (contact.email) newContact.email = contact.email;
    if (contact.fax) newContact.fax = contact.fax;
    if (contact.website) newContact.website = contact.website;
    await this.contactRepo.save(newContact);

    // Generate code
    let newCode = getUniqueCode('CLT');
    // make sur it's unique on database
    while ((await this.getWhere('code', newCode, [], false)) != undefined) {
      newCode = getUniqueCode('CLT');
    }

    // create customer
    const newCustomer = new Customer();
    newCustomer.code = newCode;
    newCustomer.name = customer.name;
    newCustomer.type = customer.type;
    newCustomer.typology = customer.typology;
    newCustomer.contact = newContact;
    newCustomer.address = newAddress;
    newCustomer.company = newCompany;

    return this.customerRepo
      .save(newCustomer)
      .then((entity) => this.getWhere('id', (entity as Customer).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.customerRepo.find();
  }

  async get(customerId: string) {
    return this.getWhere('id', customerId, ['invoices', 'delivery_sites']);
  }

  async getDeliverySites(customerId: string) {
    const customer = await this.get(customerId);
    return customer.delivery_sites;
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
      await this.companyRepo.save(foundCompany);
    }

    // update customer
    // if (inputs.name) foundCustomer.name = inputs.name;
    // if (inputs.type) foundCustomer.type = inputs.type;
    // if (inputs.address) foundCustomer.address = inputs.address;
    // if (inputs.zone) foundCustomer.zone = inputs.zone;
    // if (inputs.complement) foundCustomer.complement = inputs.complement;
    // if (inputs.postcode) foundCustomer.postcode = inputs.postcode;
    // if (inputs.city) foundCustomer.city = inputs.city;
    // if (inputs.phone) foundCustomer.city = inputs.phone;
    // if (inputs.fax) foundCustomer.fax = inputs.fax;
    // if (inputs.email) foundCustomer.email = inputs.email;
    // if (inputs.website) foundCustomer.website = inputs.website;
    // if (inputs.fountains_count) foundCustomer.fountains_count = inputs.fountains_count;
    // if (inputs.accounting_third_party_account) inputs.accounting_third_party_account = foundCustomer.accounting_third_party_account;
    // if (inputs.has_tva) foundCustomer.has_tva = inputs.has_tva;
    // if (inputs.is_blocked) foundCustomer.is_blocked = inputs.is_blocked;
    // if (inputs.blocking_reason) foundCustomer.blocking_reason = inputs.blocking_reason;
    // if (inputs.blocking_date) foundCustomer.blocking_date = new Date(inputs.blocking_date);
    // if (inputs.blocking_employee) foundCustomer.blocking_employee = inputs.blocking_employee;
    // if (inputs.blocking_last_update) foundCustomer.blocking_last_update = new Date(foundCustomer.blocking_last_update);
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

  async save(customer: Customer) {
    return await this.customerRepo.save(customer);
  }

  // calculate sold
  async getAllSold() {
    // const invoices: Invoice[] = [];
    const customers = await this.customerRepo.find();

    console.log(customers);

    return { deleted: true };
  }

  async getSold(customerId: string) {
    //  const invoices: Invoice[] = [];
    const foundCustomer = await this.getWhere('id', customerId, ['invoices']);
    console.log(foundCustomer);
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
