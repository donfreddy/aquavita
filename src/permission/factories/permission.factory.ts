import { Permissions, PERMISSIONS } from './permissions';

export const PermissionFactory = {
  provide: PERMISSIONS,
  useFactory: (permissions: Permissions): Permissions => {
    return permissions;
  },
  inject: [Permissions],
};
