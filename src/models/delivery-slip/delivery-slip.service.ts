import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { DeliverySlip } from './entities/delivery-slip.entity';
import { CreateDeliverySlipDto, UpdateDeliverySlipDto } from './dto/delivery-slip.dto';
import { CustomerService } from '../customer/customer.service';
import { generateOtpCode } from '../../common/helpers';

@Injectable()
export class DeliverySlipService {
  constructor(
    @InjectRepository(DeliverySlip)
    private readonly deliverySlipRepo: Repository<DeliverySlip>,
    private readonly user: UserService,
    private readonly customer: CustomerService,
    // private readonly purchaseOrder: PurchaseOrderService,
  ) {
  }

  async create(inputs: CreateDeliverySlipDto) {
    const newDeliverySlip = new DeliverySlip();
    newDeliverySlip.designation = inputs.designation;
    newDeliverySlip.qty_delivered = inputs.qty_delivered;
    newDeliverySlip.po_number = 'PO-' + generateOtpCode(6);
    newDeliverySlip.delivery_date = new Date(inputs.delivery_date);
    newDeliverySlip.qty_recovered_in_state = inputs.qty_recovered_in_state;
    newDeliverySlip.qty_recovered_in_broken = inputs.qty_recovered_in_broken;
    const user = await this.user.getWhere('id', inputs.deliverer_id);
    if (user) {
      newDeliverySlip.deliverer = user;
    }
    const customer = await this.customer.getWhere('id', inputs.customer_id);
    if (customer) {
      newDeliverySlip.customer = customer;
    }


    // const purchaseOrder = await this.purchaseOrder.getWhere('id', inputs.purchase_order_id);
    // if (purchaseOrder) {
    //   newDeliverySlip.purchase_order = purchaseOrder;
    // }

    return this.deliverySlipRepo
      .save(newDeliverySlip)
      .then((entity) => this.getWhere('id', (entity as DeliverySlip).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.deliverySlipRepo.find({
      order: { created_at: 'DESC' },
    });
  }

  async update(materialId: string, inputs: UpdateDeliverySlipDto) {
    const foundDeliverySlip = await this.getWhere('id', materialId);
    if (inputs.designation) foundDeliverySlip.designation = inputs.designation;
    if (inputs.qty_delivered) foundDeliverySlip.qty_delivered = inputs.qty_delivered;
    if (inputs.delivery_date) foundDeliverySlip.delivery_date = new Date(inputs.delivery_date);
    if (inputs.qty_recovered_in_state) foundDeliverySlip.qty_recovered_in_state = inputs.qty_recovered_in_state;
    if (inputs.qty_recovered_in_broken) foundDeliverySlip.qty_recovered_in_broken = inputs.qty_recovered_in_broken;
    if (inputs.deliverer_id) {
      const user = await this.user.getWhere('id', inputs.deliverer_id);
      if (user) {
        foundDeliverySlip.deliverer = user;
      }
    }
    if (inputs.customer_id) {
      const customer = await this.customer.getWhere('id', inputs.customer_id);
      if (customer) {
        foundDeliverySlip.customer = customer;
      }
    }
    // if (inputs.purchase_order_id) {
    //   const purchaseOrder = await this.purchaseOrder.getWhere('id', inputs.purchase_order_id);
    //   if (purchaseOrder) {
    //     foundDeliverySlip.purchase_order = purchaseOrder;
    //   }
    // }

    await this.deliverySlipRepo.save(foundDeliverySlip);
    return { updated: true };
  }

  async delete(materialId: string) {
    const foundMaterial = await this.getWhere('id', materialId);
    foundMaterial.deleted_at = new Date();
    await this.deliverySlipRepo.save(foundMaterial);
    return { deleted: true };
  }

  async getWhere(
    key: keyof DeliverySlip,
    value: any,
    throwsException = true,
  ): Promise<DeliverySlip | null> {
    return this.deliverySlipRepo
      .findOne({ where: { [key]: value } })
      .then((deliverySlip) => {
        if (!deliverySlip && throwsException) {
          return Promise.reject(
            new NotFoundException(`No delivery slip found with ${key} ${value}`),
          );
        }
        return Promise.resolve(deliverySlip ? deliverySlip : null);
      });
  }
}