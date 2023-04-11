import { Injectable, NotFoundException } from '@nestjs/common';
import { Carboy } from './entities/carboy.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarboyDto, UpdateCarboyDto } from './dto/carboy.dto';

@Injectable()
export class CarboyService {
  constructor(
    @InjectRepository(Carboy)
    private readonly fountainRepo: Repository<Carboy>,
  ) {
  }

  async create(inputs: CreateCarboyDto) {
    return this.fountainRepo
      .save(inputs)
      .then((entity) => this.getWhere('id', (entity as Carboy).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.fountainRepo.find({
      order: { date: 'DESC' },
    });
  }

  async update(carboyId: string, inputs: UpdateCarboyDto) {
    const foundCarboy = await this.getWhere('id', carboyId);
    if (inputs.entitled) foundCarboy.entitled = inputs.entitled;
    if (inputs.type) foundCarboy.type = inputs.type;
    if (inputs.quantity) foundCarboy.quantity = inputs.quantity;
    if (inputs.date) foundCarboy.date = new Date(inputs.date);

    await this.fountainRepo.save(foundCarboy);
    return { updated: true };
  }

  async delete(carboyId: string) {
    const foundCarboy = await this.getWhere('id', carboyId);
    await this.fountainRepo.softDelete(foundCarboy);
    return { deleted: true };
  }

  async getWhere(
    key: keyof Carboy,
    value: any,
    throwsException = true,
  ): Promise<Carboy | null> {
    return this.fountainRepo
      .findOne({ where: { [key]: value } })
      .then((carboy) => {
        if (!carboy && throwsException) {
          throw new NotFoundException();
        }
        return carboy;
      })
      .catch((error) => Promise.reject(error));
  }
}
