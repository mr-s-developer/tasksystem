import { createSelector } from "@ngrx/store";

import { AppState } from "../types/app-state";

export const selectAuthFeature = (state: AppState) => state.auth;

export const selectIsAuthenticated = createSelector(
  selectAuthFeature,
  (state) => state.isAuthenticated
)

export const selectCurrentUser = createSelector(
  selectAuthFeature,
  (state) => state.currentUser
)