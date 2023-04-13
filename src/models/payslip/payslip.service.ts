import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Payslip } from './entities/payslip.entity';

@Injectable()
export class PayslipService {
  constructor(
    @InjectRepository(Payslip)
    private readonly payslipRepo: Repository<Payslip>,
    private readonly user: UserService,
  ) {}


}