import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from 'src/models/user/entities/user.entity';
import { Permission } from './types/permission.type';
import { UserService } from 'src/models/user/user.service';
import { PermissionRole } from './enum/permission.enum';
import { generateGlobalPermissions } from './helpers/permission.helper';

@Injectable()
export class PermissionService {
  constructor(private readonly user: UserService) {}

  async getPermissions(
    user: User,
  ): Promise<{ role: PermissionRole; permissions: Permission[] }> {
    const permissions: Permission[] = [];

    const foundUser = await this.user.getWhere('id', user.id, ['role']);

    if (!foundUser) {
      throw new ForbiddenException('Forbidden accecss to this resource.');
    }
    const userPermissionRole = PermissionRole[foundUser.role.label];
    permissions.push(...generateGlobalPermissions(userPermissionRole));

    return { role: userPermissionRole, permissions };
  }
}
