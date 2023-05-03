import {
  PermissionResource,
  PermissionResourceTarget,
  PermissionAction,
  PermissionEffect,
} from '../enum/permission.enum';

export abstract class Permission {
  readonly resourceType: PermissionResource;

  readonly resourceTarget: PermissionResourceTarget | string;

  readonly action: PermissionAction;

  readonly effect: PermissionEffect;
}
