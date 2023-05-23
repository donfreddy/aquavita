import { PermissionRole } from 'src/permission/enum/permission.enum';
import { EnumEmployeeType, EnumGender } from '../../common/helpers';

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  neighborhood: string;
  hiring_date: string;
  job: string;
  employee_type: EnumEmployeeType;
  gender: EnumGender;
  role: PermissionRole;
}