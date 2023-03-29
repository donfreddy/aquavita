import { Injectable, NotFoundException } from '@nestjs/common';
import { QuarterTime } from '../quater-time/entities/quarter-time.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { CreateStock } from './dto/stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepo: Repository<Stock>,
  ) {
  }

  async create(inputs: CreateStock) {
    return this.stockRepo
      .save(inputs)
      .then((entity) => this.getWhere('id', (entity as Stock).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.stockRepo.find();
  }

  async update(stockId: string, inputs: DeepPartial<Stock>) {
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
    key: keyof QuarterTime,
    value: any,
    throwsException = true,
  ): Promise<Stock | null> {
    return this.stockRepo.findOne({ where: { [key]: value } }).then((stock) => {
      if (!stock && throwsException) {
        return Promise.reject(
          new NotFoundException(`No stock found with ${key} ${value}`),
        );
      }
      return Promise.resolve(stock ? stock : null);
    });
  }
}
