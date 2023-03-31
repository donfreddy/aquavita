import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Breakdown } from './entities/breakdown.entity';
import { CreateBreakdown, UpdateBreakdown } from './dto/breakdown.dto';
import { BreakdownType } from './entities/breakdown-type.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class BreakdownService {
  constructor(
    @InjectRepository(Breakdown)
    private readonly breakdownRepo: Repository<Breakdown>,
    @InjectRepository(BreakdownType)
    private readonly breakdownTypeRepo: Repository<BreakdownType>,
    private readonly user: UserService,
  ) {
  }

  async create(inputs: CreateBreakdown) {
    let breakdownType = await this.breakdownTypeRepo.findOneBy({ label: inputs.type });
    if (!breakdownType) {
      breakdownType = await this.breakdownTypeRepo.save({ label: inputs.type });
    }
    inputs.type = breakdownType.label;

    return this.breakdownRepo
      .save(inputs)
      .then((entity) => this.getWhere('id', (entity as Breakdown).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.breakdownRepo.find();
  }

  async getType() {
    return this.breakdownTypeRepo.find();
  }

  async update(breakdownId: string, inputs: UpdateBreakdown) {
    const foundBreakdown = await this.getWhere('id', breakdownId);

    if (inputs.name) foundBreakdown.name = inputs.name;
    if (inputs.type) foundBreakdown.type = inputs.type;
    if (inputs.status) foundBreakdown.status = inputs.status;
    if (inputs.description) foundBreakdown.description = inputs.description;
    if (inputs.tracking_time) foundBreakdown.tracking_time = new Date(inputs.tracking_time);
    if (inputs.user_id) {
      foundBreakdown.assign_to = await this.user.getWhere('id', inputs.user_id);
    }
    await this.breakdownRepo.save(foundBreakdown);
    return { updated: true };
  }

  async remove(breakdownId: string) {
    const foundBreakdown = await this.getWhere('id', breakdownId);
    await this.breakdownRepo.softDelete(foundBreakdown.id);
    return { deleted: true };
  }

  async getWhere(
    key: keyof Breakdown,
    value: any,
    throwsException = true,
  ): Promise<Breakdown | null> {
    return this.breakdownRepo.findOne({ where: { [key]: value } }).then((stock) => {
      if (!stock && throwsException) {
        return Promise.reject(
          new NotFoundException(`No breakdown found with ${key} ${value}`),
        );
      }
      return Promise.resolve(stock ? stock : null);
    });
  }
}
