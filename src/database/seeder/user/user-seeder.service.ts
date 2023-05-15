import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../../models/role/role.entity';
import { User } from '../../../models/user/entities/user.entity';
import { IUser } from '../../../models/user/user.interface';
import { hashPassword } from '../../../common/helpers';
import { users } from '../data';

/**
 * Service dealing with user based operations.
 *
 * @class
 */
@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  /**
   * Seed all users.
   *
   * @function
   */
  create(): Array<Promise<User>> {
    return users.map(async (user: IUser) => {
      return await this.userRepository
        .findOne({ where: { email: user.email } })
        .then(async dbUser => {
          // We check if a user already exists.
          // If it does don't create a new one.
          if (dbUser) {
            return Promise.resolve(null);
          }
          // First we create a role if it doesn't exist.
          const role = await this.roleRepository
            .findOne({ where: { label: user.role } })
            .then(async dbRole => {
                if (dbRole) {
                  return Promise.resolve(dbRole);
                }
                return Promise.resolve(
                  await this.roleRepository.save({
                    label: user.role,
                    description: `${user.role}`.replace(/_/g, ' ').toLowerCase(),
                  }),
                );
              },
            );

          // Create a new user.
          const newUser = new User();
          newUser.first_name = user.first_name;
          newUser.last_name = user.last_name;
          newUser.email = user.email;
          newUser.password = await hashPassword(user.password);
          newUser.role = role;
          newUser.phone = user.phone;
          newUser.employee_type = user.employee_type;
          newUser.city = user.city;
          newUser.gender = user.gender;
          newUser.neighborhood = user.neighborhood;
          newUser.job = user.job;
          newUser.hiring_date = new Date(user.hiring_date);

          return Promise.resolve(
            await this.userRepository.save(newUser),
          );
        })
        .catch(error => Promise.reject(error));
    });
  }
}
