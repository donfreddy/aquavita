import { Injectable, NotFoundException } from '@nestjs/common';
import { Fountain } from './entities/fountain.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFountain, UpdateFountain } from './dto/fountain.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class FountainService {
  constructor(
    @InjectRepository(Fountain)
    private readonly fountainRepo: Repository<Fountain>,
    private readonly user: UserService,
  ) {
  }

  async create(inputs: CreateFountain) {
    const newFountain = new Fountain();
    newFountain.client_name = inputs.client_name;
    newFountain.reason = inputs.reason;
    newFountain.serial_number = inputs.serial_number;
    newFountain.vehicule = inputs.vehicule;
    newFountain.delivery_date = new Date(inputs.delivery_date);
    const deliverer = await this.user.getWhere('id', inputs.deliverer_id);
    if (deliverer) {
      newFountain.deliverer = deliverer;
    }

    return this.fountainRepo
      .save(newFountain)
      .then((entity) => this.getWhere('id', (entity as Fountain).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.fountainRepo.find({
      relations: ['deliverer'],
      order: { delivery_date: 'DESC' },
    });
  }

  async update(fountainId: string, inputs: UpdateFountain) {
    const foundFountain = await this.getWhere('id', fountainId);
    if (inputs.client_name) foundFountain.client_name = inputs.client_name;
    if (inputs.deliverer_id) {
      const deliverer = await this.user.getWhere('id', inputs.deliverer_id);
      if (deliverer) {
        foundFountain.deliverer = deliverer;
      }
    }
    if (inputs.reason) foundFountain.reason = inputs.reason;
    if (inputs.serial_number)
      foundFountain.serial_number = inputs.serial_number;
    if (inputs.vehicule) foundFountain.vehicule = inputs.vehicule;
    if (inputs.delivery_date)
      foundFountain.delivery_date = new Date(inputs.delivery_date);

    await this.fountainRepo.save(foundFountain);
    return { updated: true };
  }

  async delete(fountainId: string) {
    const foundFountain = await this.getWhere('id', fountainId);
    foundFountain.deleted_at = new Date();
    await this.fountainRepo.save(foundFountain);
    return { deleted: true };
  }

  async getWhere(
    key: keyof Fountain,
    value: any,
    throwsException = true,
  ): Promise<Fountain | null> {
    return this.fountainRepo
      .findOne({ where: { [key]: value } })
      .then((fountain) => {
        if (!fountain && throwsException) {
          return Promise.reject(
            new NotFoundException(`No fountain found with ${key} ${value}`),
          );
        }
        return Promise.resolve(fountain ? fountain : null);
      });
  }
}
