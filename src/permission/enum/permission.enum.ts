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
  BREAKDOWNS = 'breakdown',
  CARBOYS = 'carboys',
  DELIVERY_ACTIVITY = 'delivery_activity',
  FOUNTAINS = 'fountain',
  MATERIALS = 'material',
  PLANNINGS = 'planning',
  PURCHASES = 'purchase',
  PURCHASE_ORDERS = 'purchase_order',
  PRESENCES = 'presence',
  QUARTER_TIMES = 'quarter_time',
  STOCKS = 'stock',
  TASKS = 'task',
  UPKEEP = 'upkeep',
  PAYSLIPS = 'payslip',
  ROLE = 'role',
}
