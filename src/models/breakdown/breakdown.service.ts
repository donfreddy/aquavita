import { Injectable, NotFoundException } from '@nestjs/common';
import { QuarterTime } from '../quater-time/entities/quarter-time.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Breakdown } from './entities/breakdown.entity';
import { CreatBreakdown } from './dto/breakdown.dto';

@Injectable()
export class BreakdownService {
  constructor(
    @InjectRepository(Breakdown)
    private readonly stockRepo: Repository<Breakdown>,
  ) {
  }

  async create(inputs: CreatBreakdown) {
    return this.stockRepo
      .save(inputs)
      .then((entity) => this.getWhere('id', (entity as Breakdown).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.stockRepo.find();
  }

  async update(stockId: string, inputs: DeepPartial<Breakdown>) {
    const foundStock = await this.getWhere('id', stockId);
    await this.stockRepo.update(foundStock.id, inputs);
    return { updated: true };
  }

  async remove(stockId: string) {
    const foundStock = await this.getWhere('id', stockId);
    await this.stockRepo.softDelete(foundStock.id);
    return { deleted: true };
  }

  async getWhere(
    key: keyof Breakdown,
    value: any,
    throwsException = true,
  ): Promise<Breakdown | null> {
    return this.stockRepo.findOne({ where: { [key]: value } }).then((stock) => {
      if (!stock && throwsException) {
        return Promise.reject(
          new NotFoundException(`No breakdown found with ${key} ${value}`),
        );
      }
      return Promise.resolve(stock ? stock : null);
    });
  }
}
