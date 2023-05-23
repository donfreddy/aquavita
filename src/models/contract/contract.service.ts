import { Injectable, NotFoundException } from '@nestjs/common';
import { Contract } from './entities/contract.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContractDto, UpdateContractDto } from './dto/contract.dto';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepo: Repository<Contract>,
    private readonly customer: CustomerService,
  ) {
  }

  async create(inputs: CreateContractDto) {
    const foundCustomer = await this.customer.getWhere('id', inputs.customer_id);

    const newContract = new Contract();
    newContract.invoicing_profile = inputs.invoicing_profile;
    newContract.amount = inputs.amount;
    newContract.customer = foundCustomer;
    newContract.invoiced_amount_per_month = inputs.invoiced_amount_per_month;
    if (inputs.effective_date) newContract.effective_date = new Date(inputs.effective_date);
    if (inputs.signed_and_classified) newContract.signed_and_classified = inputs.signed_and_classified;
    if (inputs.is_terminated) newContract.is_terminated = inputs.is_terminated;
    if (inputs.termination_date) newContract.termination_date = new Date(inputs.termination_date);
    if (inputs.termination_raison) newContract.termination_raison = inputs.termination_raison;
    if (inputs.carboys_per_week) newContract.carboys_per_week = inputs.carboys_per_week;
    if (inputs.placed_fountain) newContract.placed_fountain = inputs.placed_fountain;

    return this.contractRepo
      .save(newContract)
      .then((entity) => this.getWhere('id', (entity as Contract).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.contractRepo.find({
      order: { created_at: 'DESC' },
    });
  }

  async get(customerId: string) {
    return this.getWhere('id', customerId, []);
  }

  async update(contractId: string, inputs: UpdateContractDto) {
    const foundContract = await this.getWhere('id', contractId);

    if (inputs.customer_id) foundContract.customer = await this.customer.getWhere('id', inputs.customer_id);
    if (inputs.invoicing_profile) foundContract.invoicing_profile = inputs.invoicing_profile;
    if (inputs.amount) foundContract.amount = inputs.amount;
    if (inputs.invoiced_amount_per_month) foundContract.invoiced_amount_per_month = inputs.invoiced_amount_per_month;
    if (inputs.effective_date) foundContract.effective_date = new Date(inputs.effective_date);
    if (inputs.signed_and_classified) foundContract.signed_and_classified = inputs.signed_and_classified;
    if (inputs.is_terminated) foundContract.is_terminated = inputs.is_terminated;
    if (inputs.termination_date) foundContract.termination_date = new Date(inputs.termination_date);
    if (inputs.termination_raison) foundContract.termination_raison = inputs.termination_raison;
    if (inputs.carboys_per_week) foundContract.carboys_per_week = inputs.carboys_per_week;
    if (inputs.placed_fountain) foundContract.placed_fountain = inputs.placed_fountain;

    await this.contractRepo.save(foundContract);
    return { updated: true };
  }

  async delete(contractId: string) {
    const foundContract = await this.getWhere('id', contractId);
    foundContract.deleted_at = new Date();
    await this.contractRepo.save(foundContract);
    return { deleted: true };
  }

  async getWhere(
    key: keyof Contract,
    value: any,
    relations: string[] = [],
    throwsException = true,
  ): Promise<Contract | null> {
    return this.contractRepo
      .findOne({ where: { [key]: value }, relations })
      .then((contract) => {
        if (!contract && throwsException) {
          throw new NotFoundException(`Contract with ${key} ${value} not found`);
        }
        return contract;
      })
      .catch((error) => Promise.reject(error));
  }
}
