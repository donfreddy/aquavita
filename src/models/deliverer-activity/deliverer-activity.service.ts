import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateDelivererActivityDto, UpdateDelivererActivityDto } from './dto/deliverer-activity.dto';
import { CustomerService } from '../customer/customer.service';
import { DelivererActivity } from './entities/deliverer-activity.entity';
import { User } from '../user/entities/user.entity';
import { CreateDeliverySlipDto, UpdateDeliverySlipDto } from './dto/delivery-slip.dto';
import { DeliverySlip } from './entities/delivery-slip.entity';

@Injectable()
export class DelivererActivityService {
  constructor(
    @InjectRepository(DelivererActivity)
    private readonly delivererActivityRepo: Repository<DelivererActivity>,
    @InjectRepository(DeliverySlip)
    private readonly deliverySlipRepo: Repository<DeliverySlip>,
    private readonly user: UserService,
    private readonly customer: CustomerService,
  ) {
  }

  async create(inputs: CreateDelivererActivityDto) {
    const newDelivererActivity = new DelivererActivity();
    const deliverers: User[] = [];

    await Promise.all(inputs.deliverer_ids.map(async (delivererId) => {
      const deliverer = await this.user.getWhere('id', delivererId);
      if (deliverer) deliverers.push(deliverer);
    }));
    newDelivererActivity.deliverers = deliverers;
    newDelivererActivity.imma_vehicle = inputs.imma_vehicle;
    const driver = await this.user.getWhere('id', inputs.driver_id);
    if (driver) newDelivererActivity.driver = driver;
    newDelivererActivity.delivery_date = new Date(inputs.delivery_date);
    newDelivererActivity.exit_time = new Date(inputs.exit_time);
    newDelivererActivity.return_time = new Date(inputs.return_time);
    newDelivererActivity.turns1_nb_carboys_delivered = inputs.turns1_nb_carboys_delivered;
    newDelivererActivity.turns1_nb_unexpected_customers = inputs.turns1_nb_unexpected_customers;
    newDelivererActivity.turns1_nb_customers_delivered = inputs.turns1_nb_customers_delivered;
    newDelivererActivity.turns2_nb_carboys_delivered = inputs.turns2_nb_carboys_delivered;
    newDelivererActivity.turns2_nb_unexpected_customers = inputs.turns2_nb_unexpected_customers;
    newDelivererActivity.turns2_nb_customers_delivered = inputs.turns2_nb_customers_delivered;

    return this.delivererActivityRepo
      .save(newDelivererActivity)
      .then((entity) => this.getWhere('id', (entity as DelivererActivity).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll() {
    return this.delivererActivityRepo.find({
      order: { created_at: 'DESC' },
    });
  }


  async get(delivererActivityId: string): Promise<DelivererActivity> {
    return this.getWhere('id', delivererActivityId );
  }

  async update(delivererActivityId: string, inputs: UpdateDelivererActivityDto) {
    const foundDelivererActivity = await this.getWhere('id', delivererActivityId);

    if (inputs.deliverer_ids) {
      const deliverers: User[] = [];
      await Promise.all(inputs.deliverer_ids.map(async (delivererId) => {
        const deliverer = await this.user.getWhere('id', delivererId);
        if (deliverer) deliverers.push(deliverer);
      }));
      foundDelivererActivity.deliverers = deliverers;
    }

    if (inputs.imma_vehicle) foundDelivererActivity.imma_vehicle = inputs.imma_vehicle;
    if (inputs.driver_id) {
      const driver = await this.user.getWhere('id', inputs.driver_id);
      if (driver) foundDelivererActivity.driver = driver;
    }
    if (inputs.delivery_date) foundDelivererActivity.delivery_date = new Date(inputs.delivery_date);
    if (inputs.exit_time) foundDelivererActivity.exit_time = new Date(inputs.exit_time);
    if (inputs.return_time) foundDelivererActivity.return_time = new Date(inputs.return_time);
    if (inputs.turns1_nb_carboys_delivered) foundDelivererActivity.turns1_nb_carboys_delivered = inputs.turns1_nb_carboys_delivered;
    if (inputs.turns1_nb_unexpected_customers) foundDelivererActivity.turns1_nb_unexpected_customers = inputs.turns1_nb_unexpected_customers;
    if (inputs.turns1_nb_customers_delivered) foundDelivererActivity.turns1_nb_customers_delivered = inputs.turns1_nb_customers_delivered;
    if (inputs.turns2_nb_carboys_delivered) foundDelivererActivity.turns2_nb_carboys_delivered = inputs.turns2_nb_carboys_delivered;
    if (inputs.turns2_nb_unexpected_customers) foundDelivererActivity.turns2_nb_unexpected_customers = inputs.turns2_nb_unexpected_customers;
    if (inputs.turns2_nb_customers_delivered) foundDelivererActivity.turns2_nb_customers_delivered = inputs.turns2_nb_customers_delivered;

    await this.delivererActivityRepo.save(foundDelivererActivity);
    return { updated: true };
  }

  async delete(materialId: string) {
    const foundMaterial = await this.getWhere('id', materialId);
    foundMaterial.deleted_at = new Date();
    await this.delivererActivityRepo.save(foundMaterial);
    return { deleted: true };
  }

  async createDelivererSlip(delivererActivityId: string, inputs: CreateDeliverySlipDto) {
    const foundDelivererActivity = await this.getWhere('id', delivererActivityId);

    const newDeliverySlip = new DeliverySlip();
    newDeliverySlip.type = inputs.type;
    newDeliverySlip.contract = inputs.contract;
    newDeliverySlip.delivery_address = inputs.delivery_address;
    newDeliverySlip.carboys_delivered = inputs.carboys_delivered;
    newDeliverySlip.carboys_recovered_in_state = inputs.carboys_recovered_in_state;
    newDeliverySlip.carboys_recovered_in_broken = inputs.carboys_recovered_in_broken;
    newDeliverySlip.status = inputs.status;
    newDeliverySlip.observation = inputs.observation;
    const customer = await this.customer.getWhere('id', inputs.customer_id);
    if (customer) newDeliverySlip.customer = customer;
    newDeliverySlip.deliverer_activity = foundDelivererActivity;
    newDeliverySlip.customer = await this.customer.getWhere('id', inputs.customer_id);
    return await this.deliverySlipRepo.save(newDeliverySlip);
  }

  async getAllDelivererSlips(delivererActivityId: string) {
    const foundDelivererActivity = await this.getWhere('id', delivererActivityId);
    return this.deliverySlipRepo.find({
      where: {
        deliverer_activity: {
          id: foundDelivererActivity.id,
        },
      },
      order: { created_at: 'DESC' },
    });
  }

  async getDelivererSlip(delivererActivityId: string, deliverySlipId: string) {
    const foundDelivererActivity = await this.getWhere('id', delivererActivityId);
    const deliverySlip = await this.deliverySlipRepo.findOne({
      where: { id: deliverySlipId, deliverer_activity: {
        id:foundDelivererActivity.id
        } },
    });
    if (!deliverySlip) {
      return Promise.reject(new NotFoundException('No delivery slip found'));
    }
    return deliverySlip;
  }

  async updateDelivererSlip(delivererActivityId: string, deliverySlipId: string, inputs: UpdateDeliverySlipDto) {
    await this.getWhere('id', delivererActivityId);
    const foundDeliverySlip = await this.getDelivererSlip(delivererActivityId, deliverySlipId);
    console.log(foundDeliverySlip);

    if (inputs.type) foundDeliverySlip.type = inputs.type;
    if (inputs.contract) foundDeliverySlip.contract = inputs.contract;
    if (inputs.delivery_address) foundDeliverySlip.delivery_address = inputs.delivery_address;
    if (inputs.carboys_delivered) foundDeliverySlip.carboys_delivered = inputs.carboys_delivered;
    if (inputs.carboys_recovered_in_state) foundDeliverySlip.carboys_recovered_in_state = inputs.carboys_recovered_in_state;
    if (inputs.carboys_recovered_in_broken) foundDeliverySlip.carboys_recovered_in_broken = inputs.carboys_recovered_in_broken;
    if (inputs.status) foundDeliverySlip.status = inputs.status;
    if (inputs.observation) foundDeliverySlip.observation = inputs.observation;
    if (inputs.customer_id) foundDeliverySlip.customer = await this.customer.getWhere('id', inputs.customer_id);

    await this.deliverySlipRepo.save(foundDeliverySlip);
    return { updated: true };
  }

  async deleteDelivererSlip(delivererActivityId: string, deliverySlipId: string) {
    await this.getWhere('id', delivererActivityId);
    const foundDeliverySlip = await this.getDelivererSlip(delivererActivityId, deliverySlipId);
    foundDeliverySlip.deleted_at = new Date();
    await this.deliverySlipRepo.save(foundDeliverySlip);
    return { deleted: true };
  }

  async getWhere(
    key: keyof DelivererActivity,
    value: any,
    throwsException = true,
  ): Promise<DelivererActivity | null> {
    return this.delivererActivityRepo
      .findOne({ where: { [key]: value } })
      .then((delivererActivity) => {
        if (!delivererActivity && throwsException) {
          return Promise.reject(
            new NotFoundException(`No deliverer activity found with ${key} ${value}`),
          );
        }
        return Promise.resolve(delivererActivity ? delivererActivity : null);
      });
  }
}