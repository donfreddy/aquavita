import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upkeep } from './entities/upkeep.entity';
import { CreateUpkeep, UpdateUpkeep } from './dto/upkeep.dto';
import { UserService } from '../user/user.service';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class UpkeepService {
  constructor(
    @InjectRepository(Upkeep)
    private readonly upkeepRepo: Repository<Upkeep>,
    private readonly customer: CustomerService,
    private readonly user: UserService,
  ) {
  }

  async create(inputs: CreateUpkeep) {
    const customer = await this.customer.getWhere('id', inputs.customer_id);
    const maintainedBy = await this.user.getWhere('id', inputs.maintained_by_id);

    const newUpkeep = new Upkeep();
    newUpkeep.type = inputs.type;
    newUpkeep.customer = customer;
    newUpkeep.maintained_by = maintainedBy;
    newUpkeep.next_upkeep = new Date(inputs.next_upkeep);
    if (inputs.observation) newUpkeep.observation = inputs.observation;

    return this.upkeepRepo
      .save(newUpkeep)
      .then((entity) => this.getWhere('id', (entity as Upkeep).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.upkeepRepo.find();
  }

  async get(upkeepId: string) {
    return this.getWhere('id', upkeepId);
  }

  async update(upkeepId: string, inputs: UpdateUpkeep) {
    const foundUpkeep = await this.getWhere('id', upkeepId);

    if (inputs.type) foundUpkeep.type = inputs.type;
    if (inputs.observation) foundUpkeep.observation = inputs.observation;
    if (inputs.status) foundUpkeep.status = inputs.status;
    if (inputs.next_upkeep) foundUpkeep.next_upkeep = new Date(inputs.next_upkeep);
    if (inputs.customer_id) {
      foundUpkeep.customer = await this.customer.getWhere('id', inputs.customer_id);
    }
    if (inputs.maintained_by_id) {
      foundUpkeep.maintained_by = await this.user.getWhere('id', inputs.maintained_by_id);
    }
    await this.upkeepRepo.save(foundUpkeep);
    return { updated: true };
  }

  async remove(upkeepId: string) {
    const foundUpkeep = await this.getWhere('id', upkeepId);
    await this.upkeepRepo.softDelete(foundUpkeep.id);
    return { deleted: true };
  }

  async getWhere(
    key: keyof Upkeep,
    value: any,
    throwsException = true,
  ): Promise<Upkeep | null> {
    return this.upkeepRepo.findOne({ where: { [key]: value } }).then((upkeep) => {
      if (!upkeep && throwsException) {
        return Promise.reject(
          new NotFoundException(`No upkeep found with ${key} ${value}`),
        );
      }
      return Promise.resolve(upkeep ? upkeep : null);
    });
  }
}
