export interface IToast {
  id: number;
  title: string;
  description: string;
  bg?: "light" | "info" | "danger" | "success" | "warning";
  delay?: number;
}