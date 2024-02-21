import { inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";

import { authActions } from "./actions";
import { AuthService } from "../services/auth.service";
import { User } from "../../shared/types/users";
import { PersistenceService } from "../../shared/services/persistence.service";

export const loginEffect = createEffect(( 
  actions$ = inject(Actions), 
  authService = inject(AuthService), 
  persistenceService = inject(PersistenceService)
) => {
  return actions$.pipe(
    ofType(authActions.login),
    switchMap(({payload}) => {
      if(!payload){
        return of(authActions.loginFailure({ errors: { errors: ['missing payload'] } }));
      }
      return authService.login(payload).pipe(
        map((users: User[]) => {
          if(users && users.length > 0){
            const currentUser: User = users[0]; // требуется из-за особенности backend'а
            persistenceService.set('accessToken', currentUser.accessToken);
            return authActions.loginSuccess({ currentUser });
          }
          return authActions.loginFailure({ errors: { errors: ['Вы ввели неверной логин или пароль'] } });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(authActions.loginFailure({ errors: errorResponse.error.errors }));
        })
      )
    })
  )
}, { functional: true });

export const redirectAfterLoginEffect = createEffect(( 
  actions$ = inject(Actions), 
  router = inject(Router)
) => {
  return actions$.pipe(
    ofType(authActions.loginSuccess),
    tap(() => {
      router.navigateByUrl('/tasks');
    })
  )
}, { functional: true, dispatch: false });


export const logoutEffect = createEffect(( 
  actions$ = inject(Actions), 
) => {
  return actions$.pipe(
    ofType(authActions.logout),
    switchMap(() => {
      return of(authActions.logoutSuccess());
    })
  )
}, { functional: true });

export const logoutSuccessEffect = createEffect(( 
  actions$ = inject(Actions), 
  persistenceService = inject(PersistenceService),
  router = inject(Router)
) => {
  return actions$.pipe(
    ofType(authActions.logoutSuccess),
    tap(() => {
      persistenceService.remove('accessToken');
      router.navigateByUrl('/login');
    })
  )
}, { functional: true, dispatch: false });


export const isAuthenticatedEffect = createEffect(( 
  actions$ = inject(Actions), 
  authService = inject(AuthService)
) => {
  return actions$.pipe(
    ofType(authActions.isAuthenticated),
    switchMap(({payload}) => {
      if(!payload){
        return of(authActions.isAuthenticatedFailure({ errors: { errors: ['missing payload'] } }));
      }
      return authService.getUserByAccessToken(payload).pipe(
        map((users: User[]) => {
          if(users && users.length > 0){
            const currentUser: User = users[0]; // требуется из-за особенности backend'а
            return authActions.isAuthenticatedSuccess({ currentUser });
          }
          return authActions.isAuthenticatedFailure({ errors: { errors: ['Не верный токен'] } });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(authActions.isAuthenticatedFailure({ errors: errorResponse.error.errors }));
        })
      )
    })
  )
}, { functional: true });

export const redirectAfterIsAuthenticatedEffect = createEffect(( 
  actions$ = inject(Actions), 
  router = inject(Router)
) => {
  return actions$.pipe(
    ofType(authActions.isAuthenticatedSuccess),
    tap(() => {
      router.navigateByUrl('/tasks');
    })
  )
}, { functional: true, dispatch: false });