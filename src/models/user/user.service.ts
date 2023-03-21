import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { UserQuarterTime } from 'src/common/entities/user-quarter-time.entity';
import {
  hashPassword,
  ConflictError,
  InternalErrorResponse,
} from 'src/common/helpers';
import { generatePassword } from 'src/common/helpers/generate-password';
import { DeepPartial, Repository } from 'typeorm';
import { Role } from '../role/role.enum';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserQuarterTime)
    private readonly userQuarterTimeRepo: Repository<UserQuarterTime>,
  ) {
  }

  async create(inputs: CreateUserDto, hasPassword = true): Promise<any> {
    const userPassword = hasPassword ? inputs.password : generatePassword();
    const hashedPassword = await hashPassword(userPassword);

    // set user role
    const roles = [Role.User];

    try {
      const newUser = new User();
      newUser.first_name = inputs.first_name;
      newUser.last_name = inputs.last_name;
      newUser.email = inputs.email;
      newUser.password = hashedPassword;
      newUser.phone = inputs.phone;
      newUser.roles = roles;
      newUser.city = inputs.city;
      newUser.neighborhood = inputs.neighborhood;
      newUser.job = inputs.job;
      newUser.hiring_date = new Date(inputs.hiring_date);

      return this.userRepo
        .save(newUser)
        .then((entity) => this.getWhere('id', (entity as User).id))
        .catch((error) => Promise.reject(error));
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        return new ConflictError('Email already exists');
      } else {
        return new InternalErrorResponse();
      }
    }
  }

  async getAll(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.userRepo, options);
  }

  async get(userId: string): Promise<User> {
    const user = await this.getWhere('id', userId, ['tasks']);

    // get user planning
    const userPlanning = await this.userQuarterTimeRepo.find({
      where: { user: { id: user.id } },
      relations: ['quarter_time'],
    });

    return { ...user, planning: userPlanning };
  }

  async update(userId: string, inputs: DeepPartial<User>) {
    const foundUser = await this.getWhere('id', userId);
    await this.userRepo.update(foundUser.id, inputs);
    return { updated: true };
  }

  async remove(userId: string) {
    const foundUser = await this.getWhere('id', userId);
    await this.userRepo.softDelete(foundUser.id);
    return { deleted: true };
  }

  async getWhere(
    key: keyof User,
    value: any,
    relations = [],
    throwsException = true,
  ): Promise<User | null> {
    return this.userRepo
      .findOne({ where: { [key]: value }, relations })
      .then((user) => {
        if (!user && throwsException) {
          return Promise.reject(
            new NotFoundException(`No user found with ${key} ${value}`),
          );
        }
        return Promise.resolve(user ? user : null);
      });
  }
}
