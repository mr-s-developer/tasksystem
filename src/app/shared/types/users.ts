import { BackendErrors } from "./backend-errors";

export interface User {
  id: number;
  email: string;
  password: string;
  avatar: string;
  displayName: string;
  accessToken: string;
}

export interface UserListRequest {
  [key: string]: string;
}

export interface UsersState {
  isLoading: boolean;
  users: User[] | null | undefined;
  validationError: BackendErrors | null;
}