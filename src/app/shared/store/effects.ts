import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpErrorResponse } from "@angular/common/http";
import { catchError, map, of, switchMap } from "rxjs";

import { UsersService } from "../services/users.service";
import { usersActions } from "./actions";
import { User } from "../types/users";

export const userListEffect = createEffect(( 
  actions$ = inject(Actions), 
  usersService = inject(UsersService)
) => {
  return actions$.pipe(
    ofType(usersActions.userList),
    switchMap(() => {
      return usersService.getList({}).pipe(
        map((response: User[]) => {
          if(response){
            return usersActions.userListSuccess({ users: response });
          }
          return usersActions.userListFailure({ errors: { errors: ['Нет данных'] } });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(usersActions.userListFailure({ errors: errorResponse.error.errors }));
        })
      )
    })
  )
}, { functional: true });