import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TasksService } from "../services/tasks.service";
import { tasksActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { CreateTask, Task } from "../types/tasks";

export const taskListEffect = createEffect(( 
  actions$ = inject(Actions), 
  tasksService = inject(TasksService)
) => {
  return actions$.pipe(
    ofType(tasksActions.taskList),
    switchMap(({payload}) => {
      if(!payload){
        return of(tasksActions.taskListFailure({ errors: { errors: ['missing payload'] } }));
      }
      return tasksService.getList(payload).pipe(
        map((response: HttpResponse<Task[]>) => {
          if(response.body){
            const tasks: Task[] = response.body;
            const paginatorResultsLength: number = Number(response.headers.get('X-Total-Count'));
            return tasksActions.taskListSuccess({ paginatorResultsLength, tasks });
          }
          return tasksActions.taskListFailure({ errors: { errors: ['Нет данных'] } });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(tasksActions.taskListFailure({ errors: errorResponse.error.errors }));
        })
      )
    })
  )
}, { functional: true });

export const taskRemoveEffect = createEffect(( 
  actions$ = inject(Actions), 
  tasksService = inject(TasksService)
) => {
  return actions$.pipe(
    ofType(tasksActions.taskRemove),
    switchMap(({id}) => {
      return tasksService.remove(id).pipe(
        map((response: any) => {
          if(response){
            return tasksActions.taskRemoveSuccess({ id: id });
          }
          return tasksActions.taskListFailure({ errors: { errors: ['Нет данных'] } });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(tasksActions.taskListFailure({ errors: errorResponse.error.errors }));
        })
      )
    })
  )
}, { functional: true });

export const taskCreateEffect = createEffect(( 
  actions$ = inject(Actions), 
  tasksService = inject(TasksService)
) => {
  return actions$.pipe(
    ofType(tasksActions.taskCreate),
    switchMap(({payload}) => {
      if(!payload){
        return of(tasksActions.taskListFailure({ errors: { errors: ['missing payload'] } }));
      }
      return tasksService.create(payload).pipe(
        map((response: CreateTask) => {
          if(response){
            return tasksActions.taskCreateSuccess({ createdTask: response });
          }
          return tasksActions.taskListFailure({ errors: { errors: ['Нет данных'] } });
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(tasksActions.taskListFailure({ errors: errorResponse.error.errors }));
        })
      )
    })
  )
}, { functional: true });

export const taskRemoveFromStoreEffect = createEffect(( 
  actions$ = inject(Actions)
) => {
  return actions$.pipe(
    ofType(tasksActions.taskCreateSuccess),
    switchMap(() => {
      return of(tasksActions.taskCreatedRemoveFromStore());
    })
  )
}, { functional: true });