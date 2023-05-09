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
  USERS = 'user',
  CUSTOMERS = 'customer',
  BREAKDOWN = 'breakdown',
  CARBOYS = 'carboys',
  DELIVERY_ACTIVITY = 'delivery_activity',
  FOUNTAIN = 'fountain',
  MATERIAL = 'material',
  PLANNING = 'planning',
  PURCHASE = 'purchase',
  PURCHASE_ORDER = 'purchase_order',
  PRESENCE = 'presence',
  QUARTER_TIME = 'quarter_time',
  STOCK = 'stock',
  TASK = 'task',
  UPKEEP = 'upkeep',
  PAYSLIP = 'payslip',
  ROLE = 'role',
}
