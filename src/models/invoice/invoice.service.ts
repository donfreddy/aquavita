import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CustomerService } from '../customer/customer.service';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto/invoice.dto';
import { DeliverySlip } from '../deliverer-activity/entities/delivery-slip.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
    @InjectRepository(DeliverySlip)
    private readonly deliverySlipRepo: Repository<DeliverySlip>,
    private readonly customer: CustomerService,
    private readonly user: UserService,
  ) {
  }

  async create(inputs: CreateInvoiceDto) {
    const deliverySlips: DeliverySlip[] = [];
    const customer = await this.customer.getWhere('id', inputs.customer_id);

    await Promise.all(inputs.delivery_slips_ids.map(async (deliverySlipId) => {
      const deliverySlip = await this.deliverySlipRepo.findOne({ where: { id: deliverySlipId } });
      if (deliverySlip) deliverySlips.push(deliverySlip);
    }));

    const newInvoice = new Invoice();
    newInvoice.type = inputs.type;
    newInvoice.consumption_type = inputs.consumption_type;
    newInvoice.most_or_have = inputs.most_or_have;
    newInvoice.amount_excluding_taxes = inputs.amount_excluding_taxes;
    newInvoice.amount_including_taxes = inputs.amount_including_taxes;
    newInvoice.bon_count_per_week = inputs.bon_count_per_week;
    newInvoice.fountain_count = inputs.fountain_count;
    newInvoice.settlement_reference = inputs.settlement_reference;
    newInvoice.references = inputs.references;
    newInvoice.payment_method = inputs.payment_method;
    newInvoice.payment_date = new Date(inputs.payment_date);
    newInvoice.settlement_date = new Date(inputs.settlement_date);
    newInvoice.customer = customer;
    newInvoice.delivery_slips = deliverySlips;

    return this.invoiceRepo
      .save(newInvoice)
      .then((entity) => this.getWhere('id', (entity as Invoice).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.invoiceRepo.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async get(invoiceId: string) {
    return this.getWhere('id', invoiceId, ['delivery_slips']);
  }

  async update(invoiceId: string, inputs: UpdateInvoiceDto) {
    const foundInvoice = await this.getWhere('id', invoiceId);

    if (inputs.delivery_slips_ids) {
      const deliverySlips: DeliverySlip[] = [];
      await Promise.all(inputs.delivery_slips_ids.map(async (deliverySlipId) => {
          const deliverySlip = await this.deliverySlipRepo.findOne({ where: { id: deliverySlipId } });
          if (deliverySlip) deliverySlips.push(deliverySlip);
        },
      ));
      foundInvoice.delivery_slips = deliverySlips;
    }
    if (inputs.customer_id) foundInvoice.customer = await this.customer.getWhere('id', inputs.customer_id);
    if (inputs.type) foundInvoice.type = inputs.type;
    if (inputs.consumption_type) foundInvoice.consumption_type = inputs.consumption_type;
    if (inputs.most_or_have) foundInvoice.most_or_have = inputs.most_or_have;
    if (inputs.amount_excluding_taxes) foundInvoice.amount_excluding_taxes = inputs.amount_excluding_taxes;
    if (inputs.amount_including_taxes) foundInvoice.amount_including_taxes = inputs.amount_including_taxes;
    if (inputs.bon_count_per_week) foundInvoice.bon_count_per_week = inputs.bon_count_per_week;
    if (inputs.fountain_count) foundInvoice.fountain_count = inputs.fountain_count;
    if (inputs.settlement_reference) foundInvoice.settlement_reference = inputs.settlement_reference;
    if (inputs.references) foundInvoice.references = inputs.references;
    if (inputs.payment_method) foundInvoice.payment_method = inputs.payment_method;
    if (inputs.payment_date) foundInvoice.payment_date = new Date(inputs.payment_date);
    if (inputs.settlement_date) foundInvoice.settlement_date = new Date(inputs.settlement_date);

    await this.invoiceRepo.save(foundInvoice);
    return { updated: true };
  }

  async remove(invoiceId: string) {
    const foundInvoice = await this.getWhere('id', invoiceId);
    await this.invoiceRepo.softDelete(foundInvoice.id);
    return { deleted: true };
  }

  async getWhere(
    key: keyof Invoice,
    value: any,
    relations: string[] = [],
    throwsException = true,
  ): Promise<Invoice | null> {
    return this.invoiceRepo.findOne({ where: { [key]: value }, relations }).then((invoice) => {
      if (!invoice && throwsException) {
        return Promise.reject(
          new NotFoundException(`No invoice found with ${key} ${value}`),
        );
      }
      return Promise.resolve(invoice ? invoice : null);
    });
  }
}
