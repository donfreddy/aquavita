import { LocalFileService } from './../local-file/local-file.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { CreatePurchaseOrder } from './dto/purchase-order.dto';
import { getImageUrl } from '../../common/helpers';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly purchaseOrderRepo: Repository<PurchaseOrder>,
    private readonly localFile: LocalFileService,
  ) {
  }

  async create(inputs: CreatePurchaseOrder) {
    // get fileId from user input
    const newPurchaseOrder = new PurchaseOrder();
    newPurchaseOrder.name = inputs.name;
    newPurchaseOrder.po_number = inputs.po_number;
    newPurchaseOrder.amount = inputs.amount;
    newPurchaseOrder.issue_day = new Date(inputs.issue_day);
    if (inputs.filename) {
      const file = await this.localFile.getFileByName(inputs.filename);
      if (file) {
        newPurchaseOrder.file = getImageUrl(file.filename);
      }
    }

    return this.purchaseOrderRepo
      .save(inputs)
      .then((entity) => this.getWhere('id', (entity as PurchaseOrder).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.purchaseOrderRepo.find();
  }

  async update(purchaseOrderId: string, inputs: DeepPartial<PurchaseOrder>) {
    const foundPurchaseOrder = await this.getWhere('id', purchaseOrderId);
    await this.purchaseOrderRepo.update(foundPurchaseOrder.id, inputs);
    return { updated: true };
  }

  async remove(purchaseOrderId: string) {
    const foundPurchaseOrder = await this.getWhere('id', purchaseOrderId);
    await this.purchaseOrderRepo.softDelete(foundPurchaseOrder.id);
    return { deleted: true };
  }

  async getWhere(
    key: keyof PurchaseOrder,
    value: any,
    throwsException = true,
  ): Promise<PurchaseOrder | null> {
    return this.purchaseOrderRepo.findOne({ where: { [key]: value } }).then((stock) => {
      if (!stock && throwsException) {
        return Promise.reject(
          new NotFoundException(`No purchase order found with ${key} ${value}`),
        );
      }
      return Promise.resolve(stock ? stock : null);
    });
  }
}
