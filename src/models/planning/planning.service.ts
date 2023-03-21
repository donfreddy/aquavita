import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQuarterTime } from '../../common/entities/user-quarter-time.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanningService {
  constructor(
    @InjectRepository(UserQuarterTime)
    private readonly userQuarterTimeRepo: Repository<UserQuarterTime>,
  ) {
  }


  async get() {
    //
  }

  async getAll() {
    return this.userQuarterTimeRepo.find({ relations: ['quarter_time', 'user'] });
  }
}
