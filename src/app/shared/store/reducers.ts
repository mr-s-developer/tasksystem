import { createFeature, createReducer, on } from "@ngrx/store";

import { UsersState } from "../types/users";
import { usersActions } from "./actions";

const initialState: UsersState = {
  isLoading: false,
  users: undefined,
  validationError: null,
}

const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(usersActions.userList, (state)                => ({ ...state, isLoading: true, validationError: null }) ),
    on(usersActions.userListSuccess, (state, action) => ({ ...state, isLoading: false, users: action.users }) ),
    on(usersActions.userListFailure, (state, action) => ({ ...state, isLoading: false, validationError: action.errors }) )
  )
});

export const { 
  name: usersFeatureKey, 
  reducer: usersReducer,
  selectIsLoading,
  selectUsers,
  selectValidationError,
} = usersFeature;