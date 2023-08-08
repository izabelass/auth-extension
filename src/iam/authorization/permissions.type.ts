import { UsersPermission } from 'src/users/users.permissions';

export const Permission = {
  ...UsersPermission,
};

export type PermissionType = UsersPermission; // | ...other permission enums
