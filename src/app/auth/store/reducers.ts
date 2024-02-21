import { createFeature, createReducer, on } from '@ngrx/store';

import { AuthState } from '../types/auth';
import { authActions } from './actions';

const initialState: AuthState = {
  isSubbmiting: false,
  isLoading: false,
  isAuthenticated: false,
  currentUser: undefined,
  validationError: null,
}

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.login, (state)                 => ({ ...state, isSubbmiting: true, validationError: null }) ),
    on(authActions.loginSuccess, (state, action)  => ({ ...state, isSubbmiting: false, isAuthenticated: true, currentUser: action.currentUser }) ),
    on(authActions.loginFailure, (state, action)  => ({ ...state, isSubbmiting: false, validationError: action.errors }) ),

    on(authActions.logout, (state)                => ({ ...state, isSubbmiting: true, validationError: null }) ),
    on(authActions.logoutSuccess, (state)         => ({ ...state, isSubbmiting: false, isAuthenticated: false }) ),
    on(authActions.logoutFailure, (state, action) => ({ ...state, isSubbmiting: false, validationError: action.errors }) ),

    on(authActions.isAuthenticated, (state)                 => ({ ...state, validationError: null }) ),
    on(authActions.isAuthenticatedSuccess, (state, action)  => ({ ...state, isAuthenticated: true, currentUser: action.currentUser }) ),
    on(authActions.isAuthenticatedFailure, (state, action)  => ({ ...state, validationError: action.errors }) ),
  )
});

export const { 
  name: authFeatureKey, 
  reducer: authReducer,
  selectIsSubbmiting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationError,
  selectIsAuthenticated
} = authFeature;