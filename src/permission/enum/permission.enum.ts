export enum PermissionAction {
  ANY = '*', // any action
  GET = 'get',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum PermissionEffect {
  ALLOW = 'allow',
  DENY = 'deny',
}

export enum PermissionResourceTarget {
  ANY = '*',
}

export enum PermissionRole {
  VIGIL = 'VIGIL',
  WORKER = 'WORKER',
  TEAM_LEADER = 'LEADER',
  STORE_KEEPER = 'STORE_KEEPER',
  DAF = 'DAF',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum PermissionResource {
  ANY = '*',
  AUTH = 'auth',
  USERS = 'users',
}
