import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuarterTime, CreateQuarterTimePlannings } from './dto/quarter-time.dto';
import { QuarterTime } from './entities/quarter-time.entity';
import { User } from '../user/entities/user.entity';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UserQuarterTime } from '../../common/entities/user-quarter-time.entity';
import { UserService } from '../user/user.service';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

export class QuarterTimeService {
  constructor(
    @InjectRepository(QuarterTime)
    private readonly quarterTimeRepo: Repository<QuarterTime>,
    @InjectRepository(UserQuarterTime)
    private readonly userQuarterTimeRepo: Repository<UserQuarterTime>,
    private readonly user: UserService,
  ) {
  }

  async create(inputs: CreateQuarterTime) {
    return this.quarterTimeRepo
      .save(inputs)
      .then((entity) => this.getWhere('id', (entity as QuarterTime).id))
      .catch((error) => Promise.reject(error));
  }

  async getAll(options: IPaginationOptions): Promise<Pagination<QuarterTime>> {
    return paginate<QuarterTime>(this.quarterTimeRepo, options);
  }

  // create and function to plan quarter time for user
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
      // create user quarter time
      for (const user of users) {
        const userQuarterTime = new UserQuarterTime();
        userQuarterTime.user = user;
        userQuarterTime.quarter_time = quarterTime;
        userQuarterTime.start_date = new Date(inputs.start_date);
        userQuarterTime.end_date = new Date(inputs.end_date);
        userQuarterTime.is_leader = user.id === leader.id;
        await this.userQuarterTimeRepo.save(userQuarterTime);
      }
      return { created: true };
    } catch (e) {
      throw new InternalServerErrorException('Error while planning quarter time for user');
    }
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