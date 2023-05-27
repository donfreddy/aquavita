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
import { DeliveryRound } from './entities/delivery-round.entity';
import { DeliverySiteService } from '../delivery-site/delivery-site.service';
import { getUniqueCode } from '../../common/helpers';

@Injectable()
export class DelivererActivityService {
  constructor(
    @InjectRepository(DelivererActivity)
    private readonly delivererActivityRepo: Repository<DelivererActivity>,
    @InjectRepository(DeliverySlip)
    private readonly deliverySlipRepo: Repository<DeliverySlip>,
    @InjectRepository(DeliveryRound)
    private readonly deliveryRoundRepo: Repository<DeliveryRound>,
    private readonly user: UserService,
    private readonly customer: CustomerService,
    private readonly deliverySite: DeliverySiteService,
  ) {
  }

  async create(inputs: CreateDelivererActivityDto) {
    const promises = inputs.delivery_site_ids.map(async (deliverySiteId) => {
      const deliverySite = await this.deliverySite.getWhere('id', deliverySiteId);
      if (deliverySite) {
        return deliverySite;
      }
    });
    const deliverySites = await Promise.all(promises.filter(Boolean));

    // Generate code
    let newCode = getUniqueCode('FIL');
    // make sur it's unique on database
    while ((await this.getWhere('code', newCode, [], false)) != undefined) {
      newCode = getUniqueCode('FIL');
    }

    const newDelivererActivity = new DelivererActivity();
    const promises2 = inputs.deliverer_ids.map(async (delivererId) => {
      const deliverer = await this.user.getWhere('id', delivererId);
      if (deliverer) {
        return deliverer;
      }
    });
    newDelivererActivity.deliverers = await Promise.all(promises2.filter(Boolean));
    newDelivererActivity.imma_vehicle = inputs.imma_vehicle;
    newDelivererActivity.code = newCode;
    const driver = await this.user.getWhere('id', inputs.driver_id);
    if (driver) newDelivererActivity.driver = driver;
    newDelivererActivity.delivery_date = new Date(inputs.delivery_date);
    newDelivererActivity.delivery_sites = deliverySites;

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
    return this.getWhere('id', delivererActivityId, ['delivery_sites', 'delivery_sites.contract']);
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
    // const foundDelivererActivity = await this.getWhere('id', delivererActivityId);

    const newDeliverySlip = new DeliverySlip();
    if (inputs.contract) newDeliverySlip.contract = inputs.contract;
    if (inputs.stock) newDeliverySlip.stock = inputs.stock;
    // newDeliverySlip.delivery_address = inputs.delivery_address;
    if (inputs.contract) newDeliverySlip.carboys_delivered = inputs.carboys_delivered;
    if (inputs.contract) newDeliverySlip.carboys_recovered_in_state = inputs.carboys_recovered_in_state;
    if (inputs.contract) newDeliverySlip.carboys_recovered_in_broken = inputs.carboys_recovered_in_broken;
    if (inputs.contract) newDeliverySlip.status = inputs.status;
    if (inputs.observation) newDeliverySlip.observation = inputs.observation;
    //newDeliverySlip.deliverer_activity = foundDelivererActivity;
    return await this.deliverySlipRepo.save(newDeliverySlip);
  }

  async getAllDelivererSlips(delivererActivityId: string) {
    const foundDelivererActivity = await this.getWhere('id', delivererActivityId);
    return this.deliverySlipRepo.find({
      where: {
        // deliverer_activity: {
        //   id: foundDelivererActivity.id,
        // },
      },
      order: { created_at: 'DESC' },
    });
  }

  async getDelivererSlip(delivererActivityId: string, deliverySlipId: string) {
    const foundDelivererActivity = await this.getWhere('id', delivererActivityId);
    const deliverySlip = await this.deliverySlipRepo.findOne({
      where: {
        // id: deliverySlipId, deliverer_activity: {
        //   id: foundDelivererActivity.id,
        // },
      },
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

    // if (inputs.type) foundDeliverySlip.type = inputs.type;
    // if (inputs.contract) foundDeliverySlip.contract = inputs.contract;
    // if (inputs.delivery_address) foundDeliverySlip.delivery_address = inputs.delivery_address;
    // if (inputs.carboys_delivered) foundDeliverySlip.carboys_delivered = inputs.carboys_delivered;
    // if (inputs.carboys_recovered_in_state) foundDeliverySlip.carboys_recovered_in_state = inputs.carboys_recovered_in_state;
    // if (inputs.carboys_recovered_in_broken) foundDeliverySlip.carboys_recovered_in_broken = inputs.carboys_recovered_in_broken;
    // if (inputs.status) foundDeliverySlip.status = inputs.status;
    // if (inputs.observation) foundDeliverySlip.observation = inputs.observation;
    // if (inputs.customer_id) foundDeliverySlip.customer = await this.customer.getWhere('id', inputs.customer_id);

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
    relations: string[] = [],
    throwsException = true,
  ): Promise<DelivererActivity | null> {
    return this.delivererActivityRepo
      .findOne({ where: { [key]: value }, relations })
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