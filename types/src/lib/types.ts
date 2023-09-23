export interface TasksType {
  id: number;
  name: string;
  tasks: TaskType[];
}

export interface TaskType {
  id: number;
  taskDetails: string;
}

export interface UserDetails {
  id?:number;
  name: string;
  email: string;
  password: string;
  confirmpassword?: string;
}