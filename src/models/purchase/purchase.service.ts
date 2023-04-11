import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseDto, UpdatePurchaseDto } from './dto/purchase.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepo: Repository<Purchase>,
    private readonly user: UserService,
  ) {
  }

  async create(inputs: CreatePurchaseDto) {
    const newPurchase = new Purchase();
    newPurchase.item = inputs.item;
    newPurchase.quantity = inputs.quantity;
    newPurchase.initial_price = inputs.initial_price;
    newPurchase.unit_price = inputs.unit_price;
    newPurchase.date = new Date(inputs.date);
    if (inputs.initiator_id) {
      const initiator = await this.user.getWhere('id', inputs.initiator_id);
      if (initiator) {
        newPurchase.initiator = initiator;
      }
    }

    return this.purchaseRepo.save(newPurchase)
      .then((entity) => this.getWhere('id', (entity as Purchase).id))
      .catch((error) => Promise.reject(error));

  }

  async getAll() {
    return this.purchaseRepo.find(
      {
        order: { date: 'DESC' },
      },
    );
  }

  async update(purchaseId: string, inputs: UpdatePurchaseDto) {
    const foundPurchase = await this.getWhere('id', purchaseId);
    if (inputs.initiator_id) {
      const initiator = await this.user.getWhere('id', inputs.initiator_id);
      if (initiator) {
        foundPurchase.initiator = initiator;
      }
    }
    if (inputs.quantity) foundPurchase.quantity = inputs.quantity;
    if (inputs.initial_price) foundPurchase.initial_price = inputs.initial_price;
    if (inputs.unit_price) foundPurchase.unit_price = inputs.unit_price;
    if (inputs.date) foundPurchase.date = new Date(inputs.date);
    if (inputs.item) foundPurchase.item = inputs.item;
    if (inputs.observation) foundPurchase.observation = inputs.observation;

    await this.purchaseRepo.save(foundPurchase);
    return { updated: true };
  }

  async delete(purchaseId: string) {
    const foundPurchase = await this.getWhere('id', purchaseId);
    await this.purchaseRepo.softDelete(foundPurchase);
    return { deleted: true };
  }

  async getWhere(
    key: keyof Purchase,
    value: any,
    throwsException = true,
  ): Promise<Purchase | null> {
    return this.purchaseRepo
      .findOne({ where: { [key]: value } })
      .then((purchase) => {
        if (!purchase && throwsException) {
          return Promise.reject(
            new NotFoundException(`No purchase found with ${key} ${value}`),
          );
        }
        return Promise.resolve(purchase ? purchase : null);
      });
  }
}