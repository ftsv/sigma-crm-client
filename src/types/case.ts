import { ITodo } from './todo';
import { IUser } from './User';

export interface ICase {
  readonly id: number;
  title: string;
  todos: ITodo[];
  owner: IUser; //user interface
  totalCost?: number;

}