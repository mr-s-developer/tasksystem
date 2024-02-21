import { BackendErrors } from "../../shared/types/backend-errors";
import { User } from "../../shared/types/users";

export interface Task {
  id?: number;
  date: string;
  title: string;
  description: string;
  priority: string;
  userId: number;
  user: User;
}

export interface CreateTask {
  id?: number;
  date: string;
  title: string;
  description: string;
  priority: string;
  userId: number;
}

export interface TaskListRequest {
  sort?:  string;
  order?: string;
  page?:  string;
  limit?: string;
}

export interface TasksState {
  isLoading: boolean;
  tasks: TaskList | null | undefined;
  createdTask: CreateTask | null | undefined;
  deletedTask: number | null;
  validationError: BackendErrors | null;
}

export interface TaskList {
  list: Task[] | null | undefined;
  paginatorResultsLength: number;
}

export interface TaskDialogData {
  state: string;
  task: Task | null;
}