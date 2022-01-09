import { IRole } from './Role';

export interface IUser {
  id?: number | string;
  name?: string;
  email: string;
  password?: string;
  roles: IRole[];
  createdAt?: Date;
}