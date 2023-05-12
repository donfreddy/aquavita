import { Injectable, Logger } from '@nestjs/common';
import { RoleSeederService } from './role/role-seeder.service';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly roleSeederService: RoleSeederService,
  ) {
  }

  async seed() {
    await this.roles()
      .then(completed => {
        this.logger.debug('Successfully completed seeding roles...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding roles...');
        Promise.reject(error);
      });

    // await this.users()
    //   .then(completed => {
    //     this.logger.debug('Successfully completed seeding users...');
    //     Promise.resolve(completed);
    //   })
    //   .catch(error => {
    //     this.logger.error('Failed seeding users...');
    //     Promise.reject(error);
    //   });
  }

  async roles() {
    return await Promise.all(this.roleSeederService.create())
      .then(createdRoles => {
        this.logger.debug(
          'No. of roles created : ' +
          // Remove all null values and return only created roles.
          createdRoles.filter(
            nullValueOrCreatedRole => nullValueOrCreatedRole,
          ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }

  // async users() {
  //   return await Promise.all(this.userSeederService.create())
  //     .then(createdUsers => {
  //       this.logger.debug(
  //         'No. of users created : ' +
  //         // Remove all null values and return only created users.
  //         createdUsers.filter(
  //           nullValueOrCreatedUser => nullValueOrCreatedUser,
  //         ).length,
  //       );
  //       return Promise.resolve(true);
  //     })
  //     .catch(error => Promise.reject(error));
  // }
}
