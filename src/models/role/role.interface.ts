import { PermissionRole } from "src/permission/enum/permission.enum";

/**
 * Role variable type declaration.
 *
 * @interface
 */
export interface IRole {
  label: PermissionRole;
  description?: string;
}