import { IRole } from './Role';

export interface IUser {
  _id?: number | string;
  lastName?: string;
  name?: string;
  middleName?: string;
  fullName?: string;
  initials?: string;
  position?: string;
  email: string;
  password?: string;
  roles: IRole[];
  createdAt?: Date;
  isBlocked?: boolean;
}