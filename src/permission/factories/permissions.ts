import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request as ExpressRequest } from 'express';
import {
  PermissionResource,
  PermissionAction,
  PermissionResourceTarget,
} from '../enum/permission.enum';
import { generatePermission, grantedMatchRequired } from '../helpers/permission.helper';

export const PERMISSIONS = Symbol('PERMISSIONS');

@Injectable()
export class Permissions {
  constructor(@Inject(REQUEST) private readonly request: ExpressRequest) {}

  /**
   * In-controller helper for permissions checks after the initial
   * decorator-based permission has been evaluated
   * @param requiredPermission the permission to evaluate against
   * @returns true if the current user has the required permission
   */
  canActivate(
    resourceType: PermissionResource,
    action: PermissionAction,
    target: PermissionResourceTarget | string,
  ): boolean {
    const requiredPermission = generatePermission(resourceType, action, target);
    return grantedMatchRequired(
      this.context['grantedPermissions'],
      requiredPermission,
    );
  }

  private get context(): ExpressRequest {
    return this.request['permissionsContext'];
  }
}
