import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { DeepPartial, Repository } from 'typeorm';
import { QuarterPlanning } from '../../common/entities/quarter-planning.entity';
import { Stock } from '../stock/entities/stock.entity';
import { QuarterTime } from '../quater-time/entities/quarter-time.entity';

@Injectable()
export class PlanningService {
  constructor(
    @InjectRepository(UserQuarterPlanning)
    private readonly userQuarterTimeRepo: Repository<UserQuarterPlanning>,
    @InjectRepository(QuarterPlanning)
    private readonly quarterPlanningRepo: Repository<QuarterPlanning>,
  ) {
  }

  async get(planningId: string) {
    return this.quarterPlanningRepo.findOne({
      where: { id: planningId },
      relations: {
        quarter: true,
        tasks: {
          user_planning: {
            user: true
          },
          quarter_planning: {
            quarter: true
          }
        },
        teams: {
          user: true
        }
      },
    });
  }

  async getAll() {
    return this.quarterPlanningRepo.find({ relations: {
      quarter: true,
        teams: {
        user: true
      }
    }, });
  }

  async update(planningId: string, inputs: DeepPartial<QuarterPlanning>) {
    const foundQuarterPlanning = await this.getWhere('id', planningId);
    await this.quarterPlanningRepo.update(foundQuarterPlanning.id, inputs);
    return { updated: true };
  }

  async remove(stockId: string) {
    const foundStock = await this.getWhere('id', stockId);
    await this.quarterPlanningRepo.softDelete(foundStock.id);
    return { deleted: true };
  }

  async getWhere(
    key: keyof QuarterTime,
    value: any,
    throwsException = true,
  ): Promise<QuarterPlanning | null> {
    return this.quarterPlanningRepo.findOne({ where: { [key]: value } }).then((stock) => {
      if (!stock && throwsException) {
        return Promise.reject(
          new NotFoundException(`No planning found with ${key} ${value}`),
        );
      }
      return Promise.resolve(stock ? stock : null);
    });
  }
}
