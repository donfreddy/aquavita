import { IRole } from '../../models/role/role.interface';
import { IUser } from '../../models/user/user.interface';
import { EnumEmployeeType, EnumGender } from '../../common/helpers';
import { PermissionRole } from 'src/permission/enum/permission.enum';

export const roles: IRole[] = [
  { label: PermissionRole.SUPER_ADMIN, description: 'Super Admin' },
  { label: PermissionRole.STORE_KEEPER, description: 'Store Keeper' },
  { label: PermissionRole.TEAM_LEADER, description: 'Team Leader' },
  { label: PermissionRole.WORKER, description: 'Worker' },
  { label: PermissionRole.VIGIL, description: 'Vigil' },
  { label: PermissionRole.SIMPLE_USER, description: 'Simple User' },
];

export const users: IUser[] = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@gmail.com',
    password: 'Password@123',
    phone: '699999999',
    city: 'Douala',
    neighborhood: 'Bonaberi',
    hiring_date: '2021-01-01',
    role: PermissionRole.SIMPLE_USER,
    gender: EnumGender.MALE,
    job: 'Manutentionnaire',
    employee_type: EnumEmployeeType.MAINTENANCE,
  },
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'admin@gmail.com',
    password: 'admi@1234',
    phone: '699999999',
    city: 'Douala',
    neighborhood: 'neighborhood',
    hiring_date: '2021-01-01',
    role: PermissionRole.SUPER_ADMIN,
    gender: EnumGender.MALE,
    job: 'Manager',
    employee_type: EnumEmployeeType.MAINTENANCE,
  },
];
