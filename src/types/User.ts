

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: any;
  createdAt?: Date;
}