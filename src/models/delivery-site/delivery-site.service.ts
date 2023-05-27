import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerService } from '../customer/customer.service';
import { CreateDeliverySiteDto, UpdateDeliverySiteDto } from './dto/delivery-site.dto';
import { DeliverySite } from './entities/delivery-site.entity';
import { Address } from '../customer/entities/address.entity';

@Injectable()
export class DeliverySiteService {
  constructor(
    @InjectRepository(DeliverySite)
    private readonly deliverySiteRepo: Repository<DeliverySite>,
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
    private readonly customer: CustomerService,
  ) {
  }

  async create(inputs: CreateDeliverySiteDto) {
    const { address } = inputs;
    const customer = await this.customer.getWhere('id', inputs.customer_id);

    // Create address
    const newAddress = new Address();
    newAddress.address = inputs.address.address;
    if (address.city) newAddress.city = address.city;
    if (address.zone) newAddress.zone = address.zone;
    if (address.postcode) newAddress.postcode = address.postcode;
    await this.addressRepo.save(newAddress);

    const newDeliverySite = new DeliverySite();
    newDeliverySite.name = inputs.name;
    if (inputs.responsible) newDeliverySite.responsible = inputs.responsible;
    if (inputs.email) newDeliverySite.email = inputs.email;
    newDeliverySite.phone = inputs.phone;
    newDeliverySite.address = newAddress;
    newDeliverySite.customer = customer;

    return this.deliverySiteRepo
      .save(newDeliverySite)
      .then((entity) => this.getWhere('id', (entity as DeliverySite).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.deliverySiteRepo.find({
      relations:['address'],
      order: { created_at: 'DESC' },
    });
  }

  async get(deliverySiteId: string): Promise<DeliverySite> {
    return this.getWhere('id', deliverySiteId, ['address', 'customer', 'contract']);
  }

  async update(deliverySiteId: string, inputs: UpdateDeliverySiteDto) {
    const foundDeliverySite = await this.getWhere('id', deliverySiteId);

    if (inputs.address) {
      const foundAddress = await this.addressRepo.findOne({
        where: { id: foundDeliverySite.address.id },
      });

      if (foundAddress) {
        if (inputs.address.address) foundAddress.address = inputs.address.address;
        if (inputs.address.city) foundAddress.city = inputs.address.city;
        if (inputs.address.zone) foundAddress.zone = inputs.address.zone;
        if (inputs.address.postcode) foundAddress.postcode = inputs.address.postcode;
        await this.addressRepo.save(foundAddress);
      }
    }

    if (inputs.name) foundDeliverySite.name = inputs.name;
    if (inputs.responsible) foundDeliverySite.responsible = inputs.responsible;
    if (inputs.email) foundDeliverySite.email = inputs.email;
    if (inputs.phone) foundDeliverySite.phone = inputs.phone;
    if (inputs.customer_id) foundDeliverySite.customer = await this.customer.getWhere('id', inputs.customer_id);

    await this.deliverySiteRepo.save(foundDeliverySite);
    return { updated: true };
  }

  async delete(deliverySiteId: string) {
    const foundDeliverySite = await this.getWhere('id', deliverySiteId);
    foundDeliverySite.deleted_at = new Date();
    await this.deliverySiteRepo.save(foundDeliverySite);
    return { deleted: true };
  }

  async getWhere(
    key: keyof DeliverySite,
    value: any,
    relations: string[] = [],
    throwsException = true,
  ): Promise<DeliverySite | null> {
    return this.deliverySiteRepo
      .findOne({ where: { [key]: value }, relations })
      .then((deliverySite) => {
        if (!deliverySite && throwsException) {
          return Promise.reject(
            new NotFoundException(`No delivery site found with ${key} ${value}`),
          );
        }
        return Promise.resolve(deliverySite ? deliverySite : null);
      });
  }
}