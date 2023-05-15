import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQuarterPlanning } from 'src/common/entities/user-quarter-planning.entity';
import {
  EnumEmployeeType,
  hashPassword,
} from 'src/common/helpers';
import { generatePassword } from 'src/common/helpers/generate-password';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserQuarterPlanning)
    private readonly userQuarterTimeRepo: Repository<UserQuarterPlanning>,
  ) {
  }

  async create(inputs: CreateUserDto, hasPassword = true): Promise<any> {
    //check if the user is an employee
    const foundUser = await this.getWhere('email', inputs.email, [], false);
    if (foundUser) {
      throw new BadRequestException('User already exists with this email.');
    }

    console.log(inputs);
    console.log(hasPassword);

    const userPassword = hasPassword ? inputs.password : generatePassword();
    console.log(userPassword);
    console.log(generatePassword());
    const hashedPassword = await hashPassword(userPassword);

    // set user role
    // const roles = [Role.User];

    try {
      const newUser = new User();
      newUser.first_name = inputs.first_name;
      newUser.last_name = inputs.last_name;
      newUser.email = inputs.email;
      newUser.password = hashedPassword;
      newUser.phone = inputs.phone;
      newUser.employee_type = inputs.employee_type;
      newUser.city = inputs.city;
      newUser.neighborhood = inputs.neighborhood;
      newUser.job = inputs.job;
      newUser.hiring_date = new Date(inputs.hiring_date);

      return await this.userRepo
        .save(newUser)
        .then((entity) => this.getWhere('id', (entity as User).id))
        .catch((error) => Promise.reject(error));
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAll(employeeType?: EnumEmployeeType): Promise<User[]> {
    return this.userRepo.find({
      where: employeeType ? { employee_type: employeeType } : {},
      order: { first_name: 'ASC' },
    });
  }

  async get(userId: string): Promise<User> {
    return this.getWhere('id', userId, ['role', 'planning']);
  }

  async getProfile(user: User): Promise<User> {
    return this.getWhere('id', user.id, ['role','planning']);
  }

  async update(userId: string, inputs: DeepPartial<User>) {
    const foundUser = await this.getWhere('id', userId);
    await this.userRepo.update(foundUser.id, inputs);
    return { updated: true };
  }

  async updateProfile(user: User, inputs: DeepPartial<User>) {
    const foundUser = await this.getWhere('id', user.id);
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
