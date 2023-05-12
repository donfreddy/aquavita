import { IRole } from '../../models/role/role.interface';

export const roles: IRole[] = [
  { label: 'SUPER_ADMIN', description: 'Super Admin' },
  { label: 'STORE_KEEPER', description: 'Store Keeper' },
  { label: 'TEAM_LEADER', description: 'Team Leader' },
  { label: 'WORKER', description: 'Worker' },
  { label: 'VIGIL', description: 'Vigil' },
  { label: 'SIMPLE_USER', description: 'Simple User' },
];