import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, IsNull, Repository } from 'typeorm';
import { CreateQuarterTime, CreateQuarterTimePlannings } from './dto/quarter-time.dto';
import { QuarterTime } from './entities/quarter-time.entity';
import { User } from '../user/entities/user.entity';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserQuarterPlanning } from '../../common/entities/user-quarter-planning.entity';
import { UserService } from '../user/user.service';
import { QuarterPlanning } from '../../common/entities/quarter-planning.entity';
import { EnumQuarterTimeStatus } from '../../common/helpers';

export class QuarterTimeService {
  constructor(
    @InjectRepository(QuarterTime)
    private readonly quarterTimeRepo: Repository<QuarterTime>,
    @InjectRepository(UserQuarterPlanning)
    private readonly userQuarterTimeRepo: Repository<UserQuarterPlanning>,
    @InjectRepository(QuarterPlanning)
    private readonly quarterPlanningRepo: Repository<QuarterPlanning>,
    private readonly user: UserService,
  ) {
  }

  async create(inputs: CreateQuarterTime) {
    return this.quarterTimeRepo
      .save(inputs)
      .then((entity) => this.getWhere('id', (entity as QuarterTime).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll(): Promise<any> {
    return this.quarterTimeRepo.find();
  }

  async getAllUnplanned(): Promise<QuarterTime[]> {
    return this.quarterTimeRepo.find({
      where: {
        status: EnumQuarterTimeStatus.FREE,
      }
    });
  }

  // create and function to get plan quarter time
  async getQuarterTimePlanning(quarterTimeId: string, startDate?: string, endDate?: string) {
    const quarterTime = await this.getWhere('id', quarterTimeId);

    const quarterPlannings = await this.quarterPlanningRepo.find({
      where: { quarter: { id: quarterTime.id } },
      relations: ['quarter'],
    });

    // await Promise.all(quarterPlannings.map(async (el)=>{
    //   if(e)
    //   const n = await this.userQuarterTimeRepo.find({where:{i}})
    // }))

    // if (!startDate && !endDate) {
    //   return this.userQuarterTimeRepo.find({
    //     where: {
    //       quarter_time: {
    //         id: quarterTime.id,
    //       },
    //     },
    //   });
    // }
    //
    // return this.userQuarterTimeRepo.find({
    //   where: {
    //     quarter_time: {
    //       id: quarterTime.id,
    //     },
    //     created_at: Between(new Date(startDate), new Date(endDate)),
    //   },
    // });
    return quarterPlannings;
  }

  async planQuarterTimeForUser(quarterTimeId: string, inputs: CreateQuarterTimePlannings) {
    const users: User[] = [];

    const quarterTime = await this.getWhere('id', quarterTimeId);
    const leader = await this.user.getWhere('id', inputs.leader);

    // validate user
    for (const userId of inputs.teams) {
      const user = await this.user.getWhere('id', userId);
      users.push(user);
    }

    try {
      // Create quarter planning
      const newQuarterPlanning = new QuarterPlanning();
      newQuarterPlanning.start_date = new Date(inputs.start_date);
      newQuarterPlanning.end_date = new Date(inputs.end_date);
      newQuarterPlanning.quarter = quarterTime;
      await this.quarterPlanningRepo.save(newQuarterPlanning);

      // create user quarter planning
      for (const user of users) {
        const userQuarterTime = new UserQuarterPlanning();
        userQuarterTime.is_leader = user.id === leader.id;
        userQuarterTime.user = user;
        userQuarterTime.quarter_planning = newQuarterPlanning;
        await this.userQuarterTimeRepo.save(userQuarterTime);
      }

      return { created: true };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Error while planning quarter time for user');
    }
  }

  async update(quarterTimeId: string, inputs: DeepPartial<QuarterTime>) {
    const foundQuarterTime = await this.getWhere('id', quarterTimeId);
    await this.quarterTimeRepo.update(foundQuarterTime.id, inputs);
    return { updated: true };
  }

  async remove(quarterTimeId: string) {
    const foundQuarterTime = await this.getWhere('id', quarterTimeId);
    await this.quarterTimeRepo.softDelete(foundQuarterTime.id);
    return { deleted: true };
  }

  async getWhere(
    key: keyof QuarterTime,
    value: any,
    throwsException = true,
  ): Promise<QuarterTime | null> {
    return this.quarterTimeRepo.findOne({ where: { [key]: value } }).then((quarterTime) => {
      if (!quarterTime && throwsException) {
        return Promise.reject(
          new NotFoundException(`No quarterTime found with ${key} ${value}`),
        );
      }
      return Promise.resolve(quarterTime ? quarterTime : null);
    });
  }
}