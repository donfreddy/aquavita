import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(inputs: CreateUserDto): Promise<User> {
    // create role


    return this.userRepo
      .save(inputs)
      .then((entity) => this.getWhere('id', (entity as User).id))
      .catch((error) => Promise.reject(error));
  }

  async update(userId: string, inputs: DeepPartial<User>) {
    const foundUser = await this.getWhere('id', userId);
    await this.userRepo.update(foundUser.id, inputs);
    return this.getWhere('id', userId);
  }

  async remove(userId: string) {
    const foundUser = await this.getWhere('id', userId);
    await this.userRepo.softDelete(foundUser.id);
    return { deleted: true };
  }

  async getWhere(
    key: keyof User,
    value: any,
    throwsException = true,
  ): Promise<User | null> {
    return this.userRepo.findOne({ where: { [key]: value } }).then((user) => {
      if (!user && throwsException) {
        return Promise.reject(
          new NotFoundException(`No user found with ${key} ${value}`),
        );
      }
      return Promise.resolve(user ? user : null);
    });
  }
}
