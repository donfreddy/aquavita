import { Injectable, NotFoundException } from '@nestjs/common';
import { Contract } from './entities/contract.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContractDto, TerminatedDto, UpdateContractDto } from './dto/contract.dto';
import { CustomerService } from '../customer/customer.service';
import { getUniqueCode } from '../../common/helpers';
import { DeliverySite } from '../delivery-site/entities/delivery-site.entity';
import { FountainService } from '../fountain/fountain.service';
import { DeliverySiteService } from '../delivery-site/delivery-site.service';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepo: Repository<Contract>,
    private readonly customer: CustomerService,
    private readonly fountain: FountainService,
    private readonly deliverySite: DeliverySiteService,
  ) {
  }

  async create(inputs: CreateContractDto) {
    console.log(inputs);
    const foundCustomer = await this.customer.getWhere('id', inputs.customer_id);
    if (foundCustomer) {
      foundCustomer.has_contract = true;
      await this.customer.save(foundCustomer);
    }


    const promises1 = inputs.fountains.map(async (el) => {
      const foundDeliverySite = await this.deliverySite.getWhere('id', el.delivery_site_id);
      const foundFountain = await this.fountain.getWhere('id', el.fountain_id);
      console.log(foundFountain);
      if (foundFountain && foundDeliverySite) {
        foundFountain.delivery_site = foundDeliverySite;
        foundFountain.maintenance_interval = el.maintenance_interval;
        await this.fountain.save(foundFountain);
        return foundFountain;
      }
    });
    const fountains = await Promise.all(promises1.filter(Boolean));
    console.log(fountains);

    const promises2 = inputs.delivery_site_ids.map(async (deliverySiteId) => {
      const foundDeliverySite = await this.deliverySite.getWhere('id', deliverySiteId);
      if (foundDeliverySite) {
        return foundDeliverySite;
      }
    });
    const deliverySites = await Promise.all(promises2.filter(Boolean));
    console.log(deliverySites);

    // Generate code
    let newCode = getUniqueCode('COT');
    // make sur it's unique on database
    while ((await this.getWhere('code', newCode, [], false)) != undefined) {
      newCode = getUniqueCode('COT');
    }

    const newContract = new Contract();
    newContract.name = `Contract ${newCode} de ${foundCustomer.name}`;
    newContract.code = newCode;
    newContract.invoicing_profile = inputs.invoicing_profile;
    if (inputs.amount) newContract.amount = inputs.amount;
    if (inputs.amount_carboy) newContract.amount_carboy = inputs.amount_carboy;
    newContract.customer = foundCustomer;
    newContract.fountains = fountains;
    newContract.delivery_sites = deliverySites;
    if (inputs.invoiced_amount_per_month) newContract.invoiced_amount_per_month = inputs.invoiced_amount_per_month;
    if (inputs.effective_date) newContract.effective_date = new Date(inputs.effective_date);
    if (inputs.signed_and_classified) newContract.signed_and_classified = inputs.signed_and_classified;
    if (inputs.carboys_per_week) newContract.carboys_per_week = inputs.carboys_per_week;

    return this.contractRepo
      .save(newContract)
      .then((entity) => this.getWhere('id', (entity as Contract).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.contractRepo.find({
      relations: ['customer'],
      order: { created_at: 'DESC' },
    });
  }

  async get(contractId: string) {
    return this.getWhere('id', contractId, ['customer']);
  }

  async terminated(contractId: string, inputs: TerminatedDto) {
    const foundContract = await this.getWhere('id', contractId);
    foundContract.is_terminated = true;
    foundContract.termination_date = new Date(inputs.termination_date);
    if (inputs.termination_raison) foundContract.termination_raison = inputs.termination_raison;
    await this.contractRepo.save(foundContract);
    return { is_terminated: true };
  }

  async update(contractId: string, inputs: UpdateContractDto) {
    /// const fountains: Fountain[] = [];
    const deliverySites: DeliverySite[] = [];
    const foundContract = await this.getWhere('id', contractId);

    // await Promise.all(inputs.delivery_site_ids.map(async (deliverySiteId) => {
    //   const foundDeliverySite = await this.deliverySite.getWhere('id', deliverySiteId);
    //   if (foundDeliverySite) deliverySites.push(foundDeliverySite);
    // }));

    if (inputs.customer_id) foundContract.customer = await this.customer.getWhere('id', inputs.customer_id);
    if (inputs.invoicing_profile) foundContract.invoicing_profile = inputs.invoicing_profile;
    if (inputs.amount) foundContract.amount = inputs.amount;
    // if (inputs.fountains_ids) foundContract.fountains = fountains;
    if (inputs.delivery_site_ids) foundContract.delivery_sites = deliverySites;
    if (inputs.invoiced_amount_per_month) foundContract.invoiced_amount_per_month = inputs.invoiced_amount_per_month;
    if (inputs.effective_date) foundContract.effective_date = new Date(inputs.effective_date);
    if (inputs.signed_and_classified) foundContract.signed_and_classified = inputs.signed_and_classified;
    //if (inputs.is_terminated) foundContract.is_terminated = inputs.is_terminated;
    //if (inputs.termination_date) foundContract.termination_date = new Date(inputs.termination_date);
    //if (inputs.termination_raison) foundContract.termination_raison = inputs.termination_raison;
    if (inputs.carboys_per_week) foundContract.carboys_per_week = inputs.carboys_per_week;
    // if (inputs.placed_fountain) foundContract.placed_fountain = inputs.placed_fountain;

    await this.contractRepo.save(foundContract);
    return { updated: true };
  }

  async delete(contractId: string) {
    const foundContract = await this.getWhere('id', contractId);
    foundContract.deleted_at = null;
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
