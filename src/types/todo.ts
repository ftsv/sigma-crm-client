import { ICase } from './case';

export interface ITodo {
  readonly id: number;
  title: string;
  case?: ICase;
  date?: Date;
  cost?: number;
  complete: boolean;
}