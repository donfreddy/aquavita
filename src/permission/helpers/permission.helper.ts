import { BadRequestException } from '@nestjs/common';
import { isUuid } from 'lodash-uuid';
import {
  PermissionAction,
  PermissionEffect,
  PermissionResource,
  PermissionResourceTarget,
  PermissionRole,
} from '../enum/permission.enum';
import { Permission } from '../types/permission.type';

export function generateGlobalPermissions(role: PermissionRole): Permission[] {
  switch (role) {
    case PermissionRole.SUPER_ADMIN:
      return [
        generatePermission(PermissionResource.ANY, PermissionAction.ANY, PermissionResourceTarget.ANY),
      ];
    case PermissionRole.STORE_KEEPER:
      return [];
    case PermissionRole.TEAM_LEADER:
      return [];
    case PermissionRole.WORKER:
      return [];
    case PermissionRole.VIGIL:
      return [];
    case PermissionRole.SIMPLE_USER:
      return [];
    default:
      throw new BadRequestException(`Unsupported workspace role -${role}-`);
  }
}

export function generatePermission(
  resourceType: PermissionResource,
  action: PermissionAction,
  target: PermissionResourceTarget | string,
  effect = PermissionEffect.ALLOW,
): Permission {
  return {
    resourceTarget: target,
    action,
    resourceType,
    effect,
  };
}

/**
 * Check whether required permission is included in granted permissions,
 * either explicitly or as an element of a permission set. Denied permissions
 * always prevail on allowed permissions.
 * @param grantedPermissions list of granted permissions
 * @param requiredPermission permission to be checked against
 * @returns true if required permission is included in granted permissions.
 */
export function grantedMatchRequired(grantedPermissions: Permission[], requiredPermission: Permission): boolean {
  if (requiredPermission.effect !== PermissionEffect.ALLOW) {
    throw new BadRequestException('should only be used with ALLOW effect permissions');
  }

  const matchingPermissions = grantedPermissions.filter(
    (p) =>
      (p.resourceType === requiredPermission.resourceType || p.resourceType === PermissionResource.ANY) &&
      (p.action === requiredPermission.action || p.action === PermissionAction.ANY) &&
      (p.resourceTarget === requiredPermission.resourceTarget || p.resourceTarget === PermissionResourceTarget.ANY),
  );

  if (!matchingPermissions.length) {
    return false;
  }

  return !matchingPermissions.some((p) => p.effect === PermissionEffect.DENY);
}

/**
 * Extract all ids of resources matching the resource type in the required
 * permission.
 * @param grantedPermissions list of granted permissions
 * @param requiredPermission permission required
 * @param effect permission effect
 * @returns an array of the ids of all the resources included in granted
 * permissions that match the required permission resource type, effect, and
 * action.
 */
export function getPermittedResourcesIds(
  grantedPermissions: Permission[],
  requiredPermission: Permission,
  effect: PermissionEffect,
): string[] {
  return grantedPermissions
    .filter(
      (p) =>
        p.effect === effect &&
        [PermissionResource.ANY, requiredPermission.resourceType].includes(p.resourceType) &&
        [PermissionAction.ANY, requiredPermission.action].includes(p.action) &&
        isUuid(p.resourceTarget),
    )
    .map((p) => p.resourceTarget);
}