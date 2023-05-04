import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import { Request as ExpressRequest } from 'express';

import {
  GetResourceIdFn,
  REQUIRED_PERMISSION,
  RequiredPermission,
} from '../decorators/permissions.decorator';
import { Permission } from '../types/permission.type';
import { PermissionEffect } from '../enum/permission.enum';
import {
  grantedMatchRequired,
  getPermittedResourcesIds,
} from '../helpers/permission.helper';
import { PermissionService } from '../permission.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly permission: PermissionService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { httpAdapter } = this.httpAdapterHost;

    const requiredPermission = this.getRequiredPermission(context);

    const { role, permissions: grantedPermissions } =
      await this.permission.getPermissions(request.user.userId);

    if (!grantedPermissions.length) {
      return false;
    }

    const permitted = grantedMatchRequired(
      grantedPermissions,
      requiredPermission,
    );

    if (!permitted) {
      return false;
    }

    let path = httpAdapter.getRequestUrl(request);
    let deniedResourcesIds: string[] = null;
    let allowedResourcesIds: string[] = null;

    switch (path) {
      case 'police route':
        // inject all users worked police LC\MC
        // deniedResourcesIds = police sur lesquels pas travaille
        // allowedResourcesIds = police sur lesquel il a travaille et travaille
        break;
      default:
        allowedResourcesIds = getPermittedResourcesIds(
          grantedPermissions,
          requiredPermission,
          PermissionEffect.ALLOW,
        );
        break;
    }

    request.permissionsContext = {
      allowedResourcesIds,
      deniedResourcesIds,
      grantedPermissions,
    };

    return true;
  }

  /**
   * Computes permission required to access controller action, based on
   * controller permissions decorator. If resource target is dynamic (based on
   * incoming request), evaluate it.
   * @param context request context
   * @returns computed required permission
   */
  private getRequiredPermission(context: ExecutionContext): Permission {
    const permission = this.reflector.get<RequiredPermission>(
      REQUIRED_PERMISSION,
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest() as ExpressRequest;
    if (!permission) {
      throw new Error(
        `missing permissions definition for ${request.method} ${request.url}`,
      );
    }

    if (permission.resourceTarget instanceof Function) {
      return {
        ...permission,
        resourceTarget: (permission.resourceTarget as GetResourceIdFn)(request),
      };
    }

    return permission as Permission;
  }
}
