import { IRole } from './Role';

export interface IUser {
  _id?: number | string;
  lastName?: string;
  name?: string;
  middleName?: string;
  position?: string;
  email: string;
  password?: string;
  roles: IRole[];
  createdAt?: Date;
}