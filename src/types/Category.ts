
export interface ICategory {
  _id?: number;
  title: string;
  description: string;
  priority: number;
  isBlocked?: boolean;
}