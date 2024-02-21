import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { User } from "../types/users";
import { BackendErrors } from "../types/backend-errors";

export const usersActions = createActionGroup({
  source: 'users',
  events: {
    'User list': emptyProps(),
    'User list success': props<{ users: User[] }>(),
    'User list failure': props<{ errors: BackendErrors }>(),
  }
});