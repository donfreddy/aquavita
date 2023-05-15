import { IRole } from '../../models/role/role.interface';
import { IUser } from '../../models/user/user.interface';
import { EnumEmployeeType, EnumGender } from '../../common/helpers';

export const roles: IRole[] = [
  { label: 'SUPER_ADMIN', description: 'Super Admin' },
  { label: 'STORE_KEEPER', description: 'Store Keeper' },
  { label: 'TEAM_LEADER', description: 'Team Leader' },
  { label: 'WORKER', description: 'Worker' },
  { label: 'VIGIL', description: 'Vigil' },
  { label: 'SIMPLE_USER', description: 'Simple User' },
];

export const users: IUser[] = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'admin@gmail.com',
    password: 'admi@1234',
    phone: '699999999',
    city: 'Douala',
    neighborhood: 'neighborhood',
    hiring_date: '2021-01-01',
    role: 'SUPER_ADMIN',
    gender: EnumGender.MALE,
    job: 'Manager',
    employee_type: EnumEmployeeType.MAINTENANCE,
  },
];