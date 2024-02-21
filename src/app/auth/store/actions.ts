import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { IsAuthenticatedRequest, LoginRequest } from '../types/auth';
import { User } from '../../shared/types/users';
import { BackendErrors } from '../../shared/types/backend-errors';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    'Login': (payload: LoginRequest) => ({ payload }),
    'Login success': props<{ currentUser: User }>(),
    'Login failure': props<{ errors: BackendErrors }>(),

    'Logout': emptyProps(),
    'Logout success': emptyProps(),
    'Logout failure': props<{ errors: BackendErrors }>(),

    'Is authenticated': (payload: IsAuthenticatedRequest) => ({ payload }),
    'Is authenticated success': props<{ currentUser: User }>(),
    'Is authenticated failure': props<{ errors: BackendErrors }>(),
  }
});