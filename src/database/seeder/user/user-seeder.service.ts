import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../../models/role/role.entity';
import { roles } from '../data';
import { IRole } from '../../../models/role/role.interface';

/**
 * Service dealing with role based operations.
 *
 * @class
 */
@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {
  }

  /**
   * Seed all roles.
   *
   * @function
   */
  create(): Array<Promise<Role>> {
    return roles.map(async (role: IRole) => {
      return await this.roleRepository
        .findOne({ where: { label: role.label } })
        .then(async dbRole => {
          // We check if a role already exists.
          // If it does don't create a new one.
          if (dbRole) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            await this.roleRepository.save(role),
          );
        })
        .catch(error => Promise.reject(error));
    });
  }
}
