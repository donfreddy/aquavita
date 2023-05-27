import { Injectable, NotFoundException } from '@nestjs/common';
import { Fountain } from './entities/fountain.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFountain, InstallFountainDto, UpdateFountain } from './dto/fountain.dto';
import { UserService } from '../user/user.service';
import { getUniqueCode } from '../../common/helpers';

@Injectable()
export class FountainService {
  constructor(
    @InjectRepository(Fountain)
    private readonly fountainRepo: Repository<Fountain>,
    private readonly user: UserService,
  ) {
  }

  async create(inputs: CreateFountain) {
    //const foundCustomer = await this.customer.getWhere('id', inputs.customer_id);

    // Generate code
    let newCode = getUniqueCode('FON');
    // make sur it's unique on database
    while ((await this.getWhere('code', newCode, false)) != undefined) {
      newCode = getUniqueCode('FON');
    }

    const newFountain = new Fountain();
    newFountain.code = newCode;
    newFountain.model = inputs.model;
    newFountain.serial_number = inputs.serial_number;
    newFountain.brand = inputs.brand;
    newFountain.delivery_date = new Date(inputs.delivery_date);

    return this.fountainRepo
      .save(newFountain)
      .then((entity) => this.getWhere('id', (entity as Fountain).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.fountainRepo.find({
      order: { delivery_date: 'DESC' },
    });
  }

  async update(fountainId: string, inputs: UpdateFountain) {
    const foundFountain = await this.getWhere('id', fountainId);
    // // if (inputs.client_name) foundFountain.client_name = inputs.client_name;
    //  if (inputs.deliverer_id) {
    //    const deliverer = await this.user.getWhere('id', inputs.deliverer_id);
    //    if (deliverer) {
    //      foundFountain.deliverer = deliverer;
    //    }
    //  }
    //  if (inputs.reason) foundFountain.reason = inputs.reason;
    if (inputs.model) foundFountain.model = inputs.model;
    if (inputs.serial_number) foundFountain.serial_number = inputs.serial_number;
    if (inputs.brand) foundFountain.brand = inputs.brand;
    if (inputs.delivery_date) foundFountain.delivery_date = new Date(inputs.delivery_date);
    if (inputs.release_date_in_stock) foundFountain.release_date_in_stock = new Date(inputs.release_date_in_stock);

    await this.fountainRepo.save(foundFountain);
    return { updated: true };
  }

  async save(fountain: Fountain): Promise<void> {
    await this.fountainRepo.save(fountain);
  }

  // Install fountain
  async installFountain(fountainId: string, inputs: InstallFountainDto) {
    // if (inputs.delivery_date) foundFountain.delivery_date = new Date(inputs.delivery_date);
    return { installed: true };
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
