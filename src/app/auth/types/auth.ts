import { BackendErrors } from "../../shared/types/backend-errors";
import { User } from "../../shared/types/users";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface IsAuthenticatedRequest {
  accessToken: string;
}

export interface AuthState {
  isSubbmiting: boolean;
  currentUser: User | null | undefined;
  isLoading: boolean;
  validationError: BackendErrors | null;
  isAuthenticated: boolean;
}
