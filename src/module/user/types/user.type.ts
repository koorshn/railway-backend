import { UserRole } from '../enum/role.enum';

export type RegisterUser = {
  username: string;
  password: string;
  role: UserRole;
  nickName?: string;
};
